import express from "express";
import query from "../Aggregations/shopQueury.js";
import ServerParameters from "../functions.js";
import { ObjectId } from "mongodb";
// shoprouter
const shoprouter = express.Router();
// ServerParameters 
let { isUndifinedObjectId, restaurants, } = ServerParameters;
// get all endpoint
shoprouter.get("/GetAll/", async (req, res) => {
    try {
        const importingShops = await restaurants.aggregate(query).toArray();
        if (!importingShops) {
            return res.json({ "message": "error 1" });
        }
        return res.json({ "message": "sucess", "data": importingShops });
    }
    catch (error) {
        throw error;
    }
});
// adding shop 
shoprouter.post('/addOne/', async (req, res) => {
    try {
        let { body } = req;
        let verification = isSchemeValable(body);
        if (!verification) {
            return res.json({ "message": "error 2" });
        }
        const addShop = await restaurants.insertOne(body);
        if (!addShop) {
            return res.json({ "message": "error 6" });
        }
        return res.json({ "message": "sucess" });
    }
    catch (error) {
        throw error;
    }
});
//updating shop 
shoprouter.post("/updateShop", async (req, res) => {
    try {
        let { headers, body } = req;
        let verification = isSchemeValable(body); // the verification here need to be changed after in front 🔥
        if (!verification) {
            return res.json({ "message": "error 2" });
        }
        let ID = ObjectId.createFromHexString(isUndifinedObjectId(headers._id));
        const updateShop = await restaurants.findOneAndUpdate({ _id: ID }, { $set: body }, { returnDocument: "after" });
        if (!updateShop) {
            return res.json({ "message": "error 4" });
        }
        return res.json({ "message": "sucess" });
    }
    catch (error) {
        throw error;
    }
});
// delete shop 
shoprouter.get('/deleteOne/', async (req, res) => {
    try {
        let { headers } = req;
        let ID = ObjectId.createFromHexString(isUndifinedObjectId(headers._id));
        const deletingShop = await restaurants.findOneAndDelete({ _id: ID });
        console.log(deletingShop);
        if (!deletingShop) {
            return res.json({ "message": "error 3" });
        }
        return res.json({ "message": "sucess" });
    }
    catch (error) {
        throw error;
    }
});
//function to check if schema is valable 
function isSchemeValable(argument) {
    let array = ["username", "restaurantname", "location", "city", "start_time"];
    for (let elem of array) {
        if (!argument[elem]) {
            return false;
        }
    }
    return true;
}
export default shoprouter;
//# sourceMappingURL=shoproutes.js.map