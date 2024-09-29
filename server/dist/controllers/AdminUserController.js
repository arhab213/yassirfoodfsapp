import { AdminUserModel } from "../models/AdminUserModel.js";
import ServerParameters from "../functions.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
// server parameters
let { isUserSchemeValid, GetElemFromEnv, isUndefinedString } = ServerParameters;
// get unique admin user
export async function GetAdminUser(req, res) {
    try {
        let { headers } = req;
        const GettingAdminUser = await AdminUserModel.findById({
            _id: headers._id,
        });
        if (!GettingAdminUser) {
            return res.json({ message: "error 7" });
        }
        return res.json({ message: "sucess", data: GettingAdminUser });
    }
    catch (error) {
        throw error;
    }
}
// add admin user
export async function AddAdminUser(req, res) {
    try {
        let { body } = req;
        let verfication = isUserSchemeValid(body);
        if (!verfication) {
            return res.json({ message: "error 9" });
        }
        const AddingUser = await AdminUserModel.create(body);
        if (!AddingUser) {
            return res.json({ message: "error 8" });
        }
        return res.json({ message: "success" });
    }
    catch (error) {
        throw error;
    }
}
// update admin  user
export async function UpdateAdminUser(req, res) {
    try {
        let { body, params } = req;
        let verfication = isUserSchemeValid(body);
        if (!verfication) {
            return res.json({ message: "error 9" });
        }
        const UpdateUser = await AdminUserModel.findOneAndDelete({ _id: params._id }, body);
        if (!UpdateUser) {
            return res.json({ message: "error 10" });
        }
        return res.json({ message: "success" });
    }
    catch (error) {
        throw error;
    }
}
// delete admin user
export async function DeleteAdminUser(req, res) {
    try {
        let { params } = req;
        const DeletingAdminUser = await AdminUserModel.findOneAndDelete({
            _id: params._id,
        });
        if (!DeleteAdminUser) {
            return res.json({ message: "error 11" });
        }
        return res.json({ messgae: "success" });
    }
    catch (error) {
        throw error;
    }
}
// Login controller
export async function Login(req, res) {
    try {
        let { headers, body } = req;
        const FindUser = await AdminUserModel.findOne({ email: body.email });
        if (!FindUser) {
            return res.json({ message: "error 7" });
        }
        const VerifyingPassword = bcrypt.compare(FindUser.password, body.password);
        if (!VerifyingPassword) {
            return res.json({ message: "error 12" });
        }
        // generating acess token for admin users
        const AccessToken = await JWT.sign({ _id: FindUser._id }, GetElemFromEnv("ADMIN_TOKEN_SECRET"), { expiresIn: "2m" });
        // generating refresh token for admin users
        const RefreshToken = await JWT.sign({ _id: FindUser._id }, GetElemFromEnv("REFRESHED_ADMIN_TOKEN_SECRET"), { expiresIn: "1d" });
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
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=AdminUserController.js.map