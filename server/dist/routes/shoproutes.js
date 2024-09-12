import ServerParameters from "../functions.js";
import query from "../Aggregations/shopQueury.js";
import express from "express";
import { ObjectId } from "mongodb";
// ServerParameters
let { restaurants // collection restaurant 
, isUndifinedObjectId //function that handels the undifined cases of variables
 } = ServerParameters;
//data varibles
let RESTAURANTS;
const shoprouter = express.Router();
shoprouter.get("/GetAll/", async (req, res) => {
    try {
        const GetAllShops = await GetShops(query);
        if (GetAllShops) {
            return res.json({ message: "sucess", data: GetAllShops });
        }
        return res.json({ message: "error 1" });
    }
    catch (error) {
        throw error;
    }
});
shoprouter.post("/AddShop/", async (req, res) => {
    try {
        let { body } = req;
        let verification = SchemeVerification(body);
        if (!verification)
            res.json({ "message": "error 2" });
        const AddingShop = await restaurants.insertOne(body);
        if (AddingShop)
            res.json({ "message": "sucess" });
    }
    catch (error) {
        throw error;
    }
});
shoprouter.get("/deleteShop/", async (req, res) => {
    try {
        let { headers } = req; // if you face a probleme with deleting shops verify headers
        let id = new ObjectId(isUndifinedObjectId(headers._id));
        const DeleteShop = await restaurants.deleteOne({ _id: id });
        if (!DeleteShop) {
            return res.json({ "message": "error 3" });
        }
        return res.json({ "message": "sucess" });
    }
    catch (error) {
        throw error;
    }
});
shoprouter.post("/UpdateShop/", async (req, res) => {
    try {
        let { headers, body } = req;
        let updating, verified;
        verified = SchemeVerification(body); // this verification need to be changed later in the front  🔥 
        if (verified) {
            updating = await restaurants.findOneAndUpdate({ _id: isUndifinedObjectId(headers._id) }, { $set: body }, { returnDocument: "after" });
            if (!updating) {
                return res.json({ "message": "error 4" });
            }
            return res.json({ "message": "sucess" });
        }
        return res.json({ "message": "error 2" });
    }
    catch (error) {
        throw error;
    }
});
export default shoprouter;
// function shop query call 
async function GetShops(Query) {
    try {
        RESTAURANTS = await restaurants.aggregate(Query).toArray().catch((error) => { throw error; });
        return RESTAURANTS;
    }
    catch (error) {
        throw error;
    }
}
// function for scheme verification 
function SchemeVerification(object) {
    let array = ["username", "restaurantname", "location", "city", "start_time"];
    for (let elem in object) {
        if (!array.includes(elem)) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=shoproutes.js.map