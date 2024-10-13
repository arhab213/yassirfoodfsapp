import { Response, Request, NextFunction } from "express";
import { PublicUserModel } from "../models/publicUserModel.js";
import ServerParameters from "../functions.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//server parmaeter
let { isUserSchemeValid, GetElemFromEnv, isUndefinedString } = ServerParameters;
//get one user
export async function GetPublicUser(req: Request, res: Response) {
  try {
    let { headers } = req;
    let token = isUndefinedString(headers.token);
    let Cleartoken = await JWT.verify(
      isUndefinedString(token),
      GetElemFromEnv("TOKEN_SECRET")
    );
    const GetUser = await PublicUserModel.findOne({ _id: Cleartoken });
    if (!GetUser) {
      return res.json({ message: "error 7" });
    }
    //removing authentification infos
    let ObjectToSend = {
      _id: GetUser._id,
      fullname: {
        firstname: GetUser.fullname.firstname,
        lastname: GetUser.fullname.lastname,
      },
      email: GetUser.email,
    };
    return res.json({ meesage: "sucess", data: ObjectToSend });
  } catch (error) {
    throw error;
  }
}
// adding a user
export async function AddUser(req: Request, res: Response) {
  try {
    let { body } = req;

    let verfication = isUserSchemeValid(body);
    if (!verfication) {
      return res.json({ message: "error 9" });
    }

    const VerifyIfExist = await PublicUserModel.findOne({ email: body.email });
    if (VerifyIfExist) {
      return res.json({ message: "error 16" });
    }
    const AddingUser = await PublicUserModel.create(body);
    if (!AddingUser) {
      return res.json({ message: "error 8" });
    }
    return res.json({ message: "success" });
  } catch (error) {
    throw error;
  }
}
// update user
export async function UpdateUser(req: Request, res: Response) {
  try {
    let { headers, body } = req;
    //verifying token
    let token = isUndefinedString(headers.token);
    let Cleartoken = await JWT.verify(
      isUndefinedString(token),
      GetElemFromEnv("TOKEN_SECRET")
    );

    let verification = isUserSchemeValid(body); // remove it when you will build the front end🔥
    if (!verification) {
      return res.json({ message: "error 9" });
    }
    const UpdatingUser = await PublicUserModel.findOneAndUpdate(
      { _id: Cleartoken },
      body
    );
    if (!UpdatingUser) {
      return res.json({ message: "error 10" });
    }
    const user = await PublicUserModel.findById(Cleartoken);
    if (!user) {
      return res.json({ message: "error 7" });
    }
    const saltvalue = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(user.password, saltvalue);
    user.password = hashedPassword;
    user.save();
    return res.json({ message: "sucess" });
  } catch (error) {
    throw error;
  }
}
//delete user
export async function deleteUser(req: Request, res: Response) {
  try {
    let { headers } = req;
    let token = isUndefinedString(headers.token);
    let Cleartoken = await JWT.verify(
      isUndefinedString(token),
      GetElemFromEnv("TOKEN_SECRET")
    );
    const DeletingUser = await PublicUserModel.findOneAndDelete({
      _id: Cleartoken,
    });
    if (!DeletingUser) {
      return res.json({ message: "error 11" });
    }
    return res.json({ message: "sucess" });
  } catch (error) {
    throw error;
  }
}
//login
export async function Login(req: Request, res: Response) {
  try {
    let { headers, cookies, body } = req;

    const ExestingUser = await PublicUserModel.findOne({
      email: body.email,
    });

    if (!ExestingUser) {
      return res.json({ message: "error 12" });
    }

    const CheckIfPasswordValid = bcrypt.compare(
      ExestingUser.password,
      body.password
    );

    if (!CheckIfPasswordValid) {
      return res.json({ message: "error 12" });
    }

    let userID = isUndefinedString(ExestingUser._id);

    const CreateToken = await JWT.sign(
      { _id: userID },
      GetElemFromEnv("TOKEN_SECRET"),
      {
        expiresIn: "5d",
      }
    );

    const RefreshToken = await JWT.sign(
      { _id: userID },
      GetElemFromEnv("REFRESHED_TOKEN_SECERET"),
      { expiresIn: "123d" }
    );

    if (!CreateToken || !RefreshToken) {
      return res.json({ message: "error 13" });
    }

    //reteurning the refreshed token and putting it in the cookies
    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    //reterning the acess token
    return res.json({ messgae: "sucess", token: CreateToken });
  } catch (error) {
    throw error;
  }
}

// {
//   "fullname":{
//      "firstname":"arhab",
//      "lastname":"Mohamed Riad"

//   },
//   "email":"riadb942@gmail.com",
//   "password":"Arhab"
// }
