import { Response, Request, NextFunction } from "express";
import JWT from "jsonwebtoken";
import ServerParameters from "../functions.js";
import { AdminUserModel } from "../models/AdminUserModel.js";

// server parmaters
let {
  //function defined in function.ts to handle the undefined cases of string varibales
  isUndefinedString,
  //function defined in function.ts to Handle the undefined cases of .env variables
  GetElemFromEnv,
} = ServerParameters;

//first step of auth depending on AcessToken
export async function AdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { headers } = req;

    const AdminAcessToken = await JWT.verify(
      isUndefinedString(headers.token),
      GetElemFromEnv("ADMIN_TOKEN_SECRET"),
      async (error, decoded) => {
        //when the acess token will be expired
        if (error?.name == "TokenExpiredError") {
          return RefreshToken(req, res, next);
        }
        if (error) {
          next(error);
        }
        //case of valid Acesstoken
        if (decoded) {
          const FindExestingUser = await AdminUserModel.findById(decoded);
          if (!FindExestingUser) {
            res.json({ message: "error 15" });
          }
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
}
// second step of the verifcation (case of expired AcessToken)
async function RefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    let { cookies } = req;

    const AdminRefreshToken = await JWT.verify(
      isUndefinedString(cookies.AdminRefreshToken),
      GetElemFromEnv("REFRESHED_ADMIN_TOKEN_SECRET"),
      async (error, decoded) => {
        //when the refreshed token will be expired
        if (error?.name == "TokenExpiredError") {
          return res.json({ meesage: "error 14" });
        }
        if (error) {
          next(error);
        }
        //the Refreshtoken is valid
        if (decoded) {
          const ExistingUser = await AdminUserModel.findById(decoded);
          if (!ExistingUser) {
            return res.json({ message: "error 15" });
          }

          const AdminAcessToken = await JWT.sign(
            decoded,
            GetElemFromEnv("ADMIN_TOKEN_SECRET")
          );
          //replacing the expired token by the new one
          req.headers.token = AdminAcessToken;
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
}
