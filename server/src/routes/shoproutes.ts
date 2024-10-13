import express from "express";
let { isUndifinedObjectId } = ServerParameters;
import { Response, Request } from "express";
import ServerParameters from "../functions.js";
import {
  addshop,
  update,
  deleteshop,
  GetAllShops,
  GetUnique,
  GetCategories,
} from "../controllers/ShopController.js";
import { auth } from "../middleware/auth.js";
import { AdminAuth } from "../middleware/authAdmin.js";

// shoprouter
const shoprouter = express.Router();
// get all shops
shoprouter.get("/shops", GetAllShops);
// get unique shop for public user
shoprouter.get("/shopP/:id", auth, GetUnique);
// get unique shop for admin user
shoprouter.get("/shopA/:id", AdminAuth, GetUnique);
//get categories of the shop for public user
shoprouter.get("/shopP/categories/:id", auth, GetCategories);
//get categories of the shop for admin user
shoprouter.get("/shopA/categories/:id", AdminAuth, GetCategories);
// adding shop
shoprouter.post("/new/", AdminAuth, addshop);
//updating shop
shoprouter.post("/update/:id", AdminAuth, update);
// delete shop
shoprouter.get("/delete/:id", AdminAuth, deleteshop);

export default shoprouter;
