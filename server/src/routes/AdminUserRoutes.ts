import express from "express";
import {
  AddAdminUser,
  DeleteAdminUser,
  GetAdminUser,
  UpdateAdminUser,
  Login,
} from "../controllers/AdminUserController.js";
import { AdminAuth } from "../middleware/authAdmin.js";

export const AdminUserRoute = express.Router();
//get one admin user path
AdminUserRoute.get("/one", GetAdminUser);
//adding admin user path
AdminUserRoute.post("/new", AddAdminUser);
//delete admin user  path
AdminUserRoute.get("/delete", DeleteAdminUser);
// update admin user path
AdminUserRoute.post("/update", AdminAuth, UpdateAdminUser);
// admin user login path
AdminUserRoute.post("/login", Login);
