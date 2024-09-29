import { Request, Response, NextFunction } from "express";
import ServerParameters from "../functions.js";
import JWT, { JwtPayload } from "jsonwebtoken";
import { PublicUserModel } from "../models/publicUserModel.js";
let { isUndefinedString, GetElemFromEnv } = ServerParameters;

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    let { headers } = req;
    let token = headers.token;
    const clearToken = await JWT.verify(
      isUndefinedString(token),
      GetElemFromEnv("TOKEN_SECRET"),
      async (error, decoded) => {
        if (error?.name == "TokenExpiredError") {
          return RefreshedToken(req, res, next);
        }
        if (error) {
          next(error);
        }
        if (decoded) {
          const findUser = await PublicUserModel.findById(decoded);
          if (!findUser) {
            return res.json({ message: "error 15" });
          }
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
}

async function RefreshedToken(req: Request, res: Response, next: NextFunction) {
  try {
    let { cookies } = req;
    const RefreshedToken = await JWT.verify(
      isUndefinedString(cookies.RefreshToken),
      GetElemFromEnv("REFRESHED_TOKEN_SECERET"),
      async (error, decoded) => {
        if (error?.name == "TokenExpiredError") {
          return res.json({ message: "error 14" });
        }
        if (error) {
          next(error);
        }
        if (decoded) {
          const findUser = await PublicUserModel.findById(decoded);
          if (!findUser) {
            return res.json({ message: "error 15" });
          }
          const regenerateNew = await JWT.sign(
            decoded,
            GetElemFromEnv("TOKEN_SECRET")
          );
          req.headers.token = regenerateNew;
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
}
