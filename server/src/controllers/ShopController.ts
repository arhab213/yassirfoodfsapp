import { Response, Request, NextFunction } from "express";
import query from "../Aggregations/shopQueury.js";
import ItemQuery from "../Aggregations/RestaurantItem.js";
import ServerParameters from "../functions.js";
import { ObjectId } from "mongodb";
import getUniqueDetailsShopQuery from "../Aggregations/get-unique-shop-details.js";

// ServerParameters
let {
  isUndifinedObjectId,
  restaurants,
  isRestaurantSchemeValable,
  isUndefinedString,
  categories,
} = ServerParameters;
// get all shops
export async function GetAllShops(req: Request, res: Response) {
  try {
    const importingShops = await restaurants.aggregate(query).toArray();
    if (!importingShops) {
      return res.json({ message: "error 1" });
    }
    return res.json({ meesage: "sucees", data: importingShops });
  } catch (error) {
    throw error;
  }
}
//get details of the shop
export async function GetDetails(req: Request, res: Response) {
  try {
    const importingDetails = await restaurants.aggregate(ItemQuery).toArray();
    if (!importingDetails) {
      return res.json({ message: "error 19" });
    }
    return res.json({ message: "success", data: importingDetails });
  } catch (error) {
    throw error;
  }
}

//get unique shop
export async function GetUnique(req: Request, res: Response) {
  try {
    let { params, headers } = req;
    const id: string = params.id;

    let MatchStage = [
      {
        $match: {
          _id: id,
        },
      },
    ];
    const TheCompleteQuery = MatchStage.concat(getUniqueDetailsShopQuery);

    const FindOne = await restaurants.aggregate(TheCompleteQuery).toArray();

    if (!FindOne) {
      return res.json({ message: "error 17" });
    }
    return res.json({ message: "success", data: FindOne[0] });
  } catch (error) {
    throw error;
  }
}
// add shop
export async function addshop(req: Request, res: Response) {
  try {
    let { body } = req;
    let verification = isRestaurantSchemeValable(body);
    if (!verification) {
      return res.json({ message: "error 2" });
    }
    const addShop = await restaurants.insertOne(body);
    if (!addShop) {
      return res.json({ message: "error 6" });
    }
    return res.json({ message: "sucess" });
  } catch (error) {
    throw error;
  }
}
// update shop
export async function update(req: Request, res: Response) {
  try {
    let { params, body } = req;
    let { id } = params;
    let verification = isRestaurantSchemeValable(body); // the verification here need to be changed after in front 🔥

    if (!verification) {
      return res.json({ message: "error 2" });
    }
    let ID = ObjectId.createFromHexString(isUndifinedObjectId(id));
    const updateShop = await restaurants.updateOne({ _id: ID }, { $set: body });

    if (!updateShop) {
      return res.json({ message: "error 4" });
    }
    return res.json({ message: "sucess" });
  } catch (error) {
    throw error;
  }
}
// deleting shop

export async function deleteshop(req: Request, res: Response) {
  try {
    let { params } = req;
    let { id } = params;
    let ID = ObjectId.createFromHexString(isUndifinedObjectId(id));

    const deletingShop = await restaurants.findOneAndDelete({ _id: ID });

    if (!deletingShop) {
      return res.json({ message: "error 3" });
    }
    return res.json({ message: "sucess" });
  } catch (error) {
    throw error;
  }
}
export async function GetCategories(req: Request, res: Response) {
  try {
    let { params } = req;
    let { id } = params;

    const GetCategories = await categories.findOne({ restaurant: id });
    if (!GetCategories) {
      return res.json({ message: "error" });
    }
    return res.json({ message: "success", data: GetCategories });
  } catch (error) {
    throw error;
  }
}
