import express from "express";
import { Login, deleteUser, UpdateUser, AddUser, } from "../controllers/PublicUserController.js";
const PublicUserRouter = express.Router();
PublicUserRouter.post("/addOne/", AddUser);
PublicUserRouter.get("/Delete/:id", deleteUser);
PublicUserRouter.post("/Update/", UpdateUser);
PublicUserRouter.post("/Login/", Login);
export default PublicUserRouter;
//# sourceMappingURL=PublicUserRoutes.js.map