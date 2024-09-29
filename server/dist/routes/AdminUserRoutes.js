import express from "express";
import { AddAdminUser, DeleteAdminUser, GetAdminUser, UpdateAdminUser, Login, } from "../controllers/AdminUserController.js";
export const AdminUserRoute = express.Router();
AdminUserRoute.get("/GetOne/", GetAdminUser);
AdminUserRoute.post("/AddOne/", AddAdminUser);
AdminUserRoute.get("/deleteOne/:id", DeleteAdminUser);
AdminUserRoute.post("/updateOne/:id", UpdateAdminUser);
AdminUserRoute.post("/Login", Login);
//# sourceMappingURL=AdminUserRoutes.js.map