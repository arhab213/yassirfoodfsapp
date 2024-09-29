import query from "../Aggregations/shopQueury.js";
import ServerParameters from "../functions.js";
import { ObjectId } from "mongodb";
// ServerParameters
let { isUndifinedObjectId, restaurants, isSchemeValable } = ServerParameters;
// get all shops
export async function GetAllShops(req, res) {
    try {
        const importingShops = await restaurants.aggregate(query).toArray();
        if (!importingShops) {
            return res.json({ message: "error 1" });
        }
        return res.json({ meesage: "sucees", data: importingShops });
    }
    catch (error) {
        throw error;
    }
}
export async function GetUnique(req, res, next) {
    try {
        let { params } = req;
        let { id } = params;
        let ID = ObjectId.createFromHexString(isUndifinedObjectId(id));
        const FindOne = await restaurants.findOne({ _id: ID });
        if (!FindOne) {
            return res.json({ message: "error 17" });
        }
        return res.json({ message: "success", data: FindOne });
    }
    catch (error) {
        throw error;
    }
}
// add shop
export async function addshop(req, res) {
    try {
        let { body } = req;
        let verification = isSchemeValable(body);
        if (!verification) {
            return res.json({ message: "error 2" });
        }
        const addShop = await restaurants.insertOne(body);
        if (!addShop) {
            return res.json({ message: "error 6" });
        }
        return res.json({ message: "sucess" });
    }
    catch (error) {
        throw error;
    }
}
// update shop
export async function update(req, res) {
    try {
        let { params, body } = req;
        let { id } = params;
        let verification = isSchemeValable(body); // the verification here need to be changed after in front 🔥
        if (!verification) {
            return res.json({ message: "error 2" });
        }
        let ID = ObjectId.createFromHexString(isUndifinedObjectId(id));
        const updateShop = await restaurants.updateOne({ _id: ID }, { $set: body } //66f95fb843934fd585a60662
        );
        if (!updateShop) {
            return res.json({ message: "error 4" });
        }
        return res.json({ message: "sucess" });
    }
    catch (error) {
        throw error;
    }
}
// deleting shop
export async function deleteshop(req, res) {
    try {
        let { params } = req;
        let { id } = params;
        let ID = ObjectId.createFromHexString(isUndifinedObjectId(id));
        const deletingShop = await restaurants.findOneAndDelete({ _id: ID });
        if (!deletingShop) {
            return res.json({ message: "error 3" });
        }
        return res.json({ message: "sucess" });
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=ShopController.js.map