import express from "express";
import {
  Login,
  deleteUser,
  UpdateUser,
  GetPublicUser,
  AddUser,
} from "../controllers/PublicUserController.js";
import { auth } from "../middleware/auth.js";
const PublicUserRouter = express.Router();
PublicUserRouter.get("/one", auth, GetPublicUser);
PublicUserRouter.post("/new", AddUser);
PublicUserRouter.get("/delete", auth, deleteUser);
PublicUserRouter.post("/update", auth, UpdateUser);
PublicUserRouter.post("/login/", Login);
export default PublicUserRouter;
