import express from "express";
let { isUndifinedObjectId, restaurants, isSchemeValable } = ServerParameters;
import ServerParameters from "../functions.js";
import { addshop, update, deleteshop, GetAllShops, GetUnique, } from "../controllers/ShopController.js";
import { AdminAuth } from "../middleware/authAdmin.js";
// shoprouter
const shoprouter = express.Router();
// get all shops
shoprouter.get("/GetAll/", GetAllShops);
// get unique shop
shoprouter.get("/GetUnique/:id", AdminAuth, GetUnique);
// adding shop
shoprouter.post("/addOne/", AdminAuth, addshop);
//updating shop
shoprouter.post("/updateShop/:id", AdminAuth, update);
// delete shop
shoprouter.get("/deleteOne/:id", AdminAuth, deleteshop);
export default shoprouter;
//# sourceMappingURL=shoproutes.js.map