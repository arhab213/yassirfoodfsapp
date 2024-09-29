import express from "express";
let { isUndifinedObjectId, restaurants, isSchemeValable } = ServerParameters;
import { Response, Request } from "express";
import ServerParameters from "../functions.js";
import {
  addshop,
  update,
  deleteshop,
  GetAllShops,
  GetUnique,
} from "../controllers/ShopController.js";
import { ObjectId } from "mongodb";
import { auth } from "../middleware/auth.js";
import { AdminAuth } from "../middleware/authAdmin.js";
// shoprouter
const shoprouter = express.Router();

// get all shops
shoprouter.get("/GetAll/", GetAllShops);
// get unique shop
shoprouter.get("/GetUnique/:id", auth, GetUnique);
// adding shop
shoprouter.post("/addOne/", AdminAuth, addshop);
//updating shop
shoprouter.post("/updateShop/:id", AdminAuth, update);
// delete shop
shoprouter.get("/deleteOne/:id", AdminAuth, deleteshop);

export default shoprouter;
