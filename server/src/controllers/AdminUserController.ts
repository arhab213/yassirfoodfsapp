import { AdminUserModel } from "../models/AdminUserModel.js";
import { NextFunction, Request, Response } from "express";
import ServerParameters from "../functions.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { error, log } from "console";
import { ReturnDocument } from "mongodb";
// server parameters
let { GetElemFromEnv, isUndefinedString, isUserAdminSchemeValid } =
  ServerParameters;
// get unique admin user
export async function GetAdminUser(req: Request, res: Response) {
  try {
    let { headers } = req;
    //verifying token

    let token = isUndefinedString(headers.token);
    let Cleartoken = await JWT.verify(
      token,
      GetElemFromEnv("ADMIN_TOKEN_SECRET")
    );

    //redirecting to login if there is any probleme with the token
    if (!token) {
      return res.json({ message: "error 16" });
    }

    const GettingAdminUser = await AdminUserModel.findById(Cleartoken);

    if (!GettingAdminUser) {
      return res.json({ message: "error 7" });
    }
    //importing only the important infos
    const SendingObject = {
      firstname: GettingAdminUser.fullname.firstname,
      lastname: GettingAdminUser.fullname.lastname,
      email: GettingAdminUser.email,
      shops: GettingAdminUser.shops,
      isAdmin: GettingAdminUser.isAdmin,
    };
    return res.json({ message: "sucess", data: SendingObject });
  } catch (error) {
    throw error;
  }
}
// add admin user

export async function AddAdminUser(req: Request, res: Response) {
  try {
    let { body } = req;
    body.isAdmin = true;
    let verfication = isUserAdminSchemeValid(body);
    if (!verfication) {
      return res.json({ message: "error 9" });
    }
    const VerifyIfExist = await AdminUserModel.findOne({ email: body.email });
    //verifying if the user exist to avoid server crashing du to indexations
    if (VerifyIfExist) {
      return res.json({ message: "error 16" });
    }

    const AddingUser = await AdminUserModel.create(body);

    if (!AddingUser) {
      return res.json({ message: "error 8" });
    }
    // generating acess token for admin users
    const AccessToken = await JWT.sign(
      { _id: AddingUser._id },
      GetElemFromEnv("ADMIN_TOKEN_SECRET"),
      { expiresIn: "2h" }
    );
    // generating refresh token for admin users
    const RefreshToken = await JWT.sign(
      { _id: AddingUser._id },
      GetElemFromEnv("REFRESHED_ADMIN_TOKEN_SECRET"),
      { expiresIn: "1d" }
    );
    //verfying if the tokens was created
    if (!RefreshToken || !AccessToken) {
      return res.json({ message: "error 13" });
    }
    // setting up refreshed token in the site as cookie
    res.cookie("AdminRefreshToken", RefreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    //setting up acessToken in the request headers
    return res.json({ message: "sucess", token: AccessToken });
  } catch (error) {
    throw error;
  }
}
// update admin  user

export async function UpdateAdminUser(req: Request, res: Response) {
  try {
    let { body, headers } = req;
    let verfication = isUserAdminSchemeValid(body);
    if (!verfication) {
      return res.json({ message: "error 9" });
    }
    //verifying token
    let token = isUndefinedString(headers.token);
    let Cleartoken = await JWT.verify(
      isUndefinedString(token),
      GetElemFromEnv("ADMIN_TOKEN_SECRET")
    );

    const UpdateUser = await AdminUserModel.findOneAndUpdate(
      { _id: Cleartoken },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!UpdateUser) {
      return res.json({ message: "error 10" });
    }
    //updating the password hash
    const user = await AdminUserModel.findById(Cleartoken);
    if (user) {
      const saltvalue = await bcrypt.genSalt(8);
      const HashedPassword = await bcrypt.hash(body.password, saltvalue);
      user.password = HashedPassword;
      user.save();
    } else {
      return res.json({ message: "error 7" });
    }
    return res.json({ message: "success" });
  } catch (error) {
    throw error;
  }
}

// delete admin user
export async function DeleteAdminUser(req: Request, res: Response) {
  try {
    let { headers } = req;
    let { token } = headers;
    let Cleartoken = await JWT.verify(
      isUndefinedString(token),
      GetElemFromEnv("ADMIN_TOKEN_SECRET")
    );

    const DeletingAdminUser = await AdminUserModel.findOneAndDelete({
      _id: Cleartoken,
    });
    if (!DeleteAdminUser) {
      return res.json({ message: "error 11" });
    }
    return res.json({ messgae: "success" });
  } catch (error) {
    throw error;
  }
}
// Login controller
export async function Login(req: Request, res: Response) {
  try {
    let { headers, body } = req;
    const FindUser = await AdminUserModel.findOne({ email: body.email });

    if (!FindUser) {
      return res.json({ message: "error 7" });
    }

    const VerifyingPassword = await bcrypt.compare(
      body.password,
      FindUser.password
    );
    if (!VerifyingPassword) {
      return res.json({ message: "error 12" });
    }

    // generating acess token for admin users
    const AccessToken = await JWT.sign(
      { _id: FindUser._id },
      GetElemFromEnv("ADMIN_TOKEN_SECRET"),
      { expiresIn: "2h" }
    );
    // generating refresh token for admin users
    const RefreshToken = await JWT.sign(
      { _id: FindUser._id },
      GetElemFromEnv("REFRESHED_ADMIN_TOKEN_SECRET"),
      { expiresIn: "1d" }
    );
    //verfying if the tokens was created
    if (!RefreshToken || !AccessToken) {
      return res.json({ message: "error 13" });
    }
    // setting up refreshed token in the site as cookie
    res.cookie("AdminRefreshToken", RefreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });
    //setting up acessToken in the request headers
    return res.json({ message: "sucess", token: AccessToken });
  } catch (error) {
    throw error;
  }
}

//in this controllers the response will in the shape of : {"message":"---","data":"---"} / {"message":"sucess"} / {"message":"error --"} / {"message":"sucess",token:-----}
