import express from "express";
let { isUndifinedObjectId } = ServerParameters;
import ServerParameters from "../functions.js";
import { addshop, update, deleteshop, GetAllShops, GetUnique, GetCategories, GetDetails, } from "../controllers/ShopController.js";
import { auth } from "../middleware/auth.js";
import { AdminAuth } from "../middleware/authAdmin.js";
// shoprouter
const shoprouter = express.Router();
// get all shops
shoprouter.get("/shops", GetAllShops);
//getting details of the restaurants in a unique shop
shoprouter.get("/shops-details", GetDetails);
// get unique shop for public user
shoprouter.get("/unique/:id", GetUnique);
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
//# sourceMappingURL=shoproutes.js.map