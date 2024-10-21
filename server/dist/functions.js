import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import { error } from "console";
import cookieParser from "cookie-parser";
//the collections and db
//Client Creation and uri
let CLUSTER = GetElemFromEnv("CLUSTER_STRING");
let SERVER = GetElemFromEnv("SERVER_PATH_DB");
let uri = SERVER ? SERVER : CLUSTER;
const Client = new MongoClient(uri);
const db = Client.db("ShopDb");
//categories /offers :restaurnat collection
let restaurants = db.collection("restaurant");
let categories = db.collection("categories");
let offers = db.collection("offers");
const UserDB = Client.db("test");
//user collections
const PUBLIC_USER_COLLECTION = UserDB.collection("publicusers");
const ADMIN_USERS_COLLECTION = UserDB.collection("adminusers");
//function for etablishing the db connection
let ConnectionState = { 1: "Connected to the db", 2: "Disconnected from db" };
function HandlingConnection(set) {
    if (set) {
        mongoose.connect(uri + "/user");
        Client.connect();
        return console.log(ConnectionState[1]);
    }
    mongoose.disconnect();
    Client.close();
    return console.log(ConnectionState[2]);
}
//function for seeting up the server
let app;
// function for setting server
function ServerSetup(argument) {
    app = express();
    http.createServer(app);
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(cookieParser());
    app.use(cors({ origin: "*" }));
    argument.map((e) => {
        return app.use(e.path, e.route);
    });
    let PORT = GetElemFromEnv("LOCAL_HOST_PORT");
    app.listen(PORT, () => {
        console.log(`Connected to the port ${PORT}`);
    });
}
//creating indexes
async function IndexesCreation() {
    try {
        let IndexOne = await restaurants.createIndex({ _id: 1 });
        let IndexTwo = await restaurants.createIndex({ restaurantname: 1 });
        let IndexThree = await PUBLIC_USER_COLLECTION.createIndex({ email: 1 }, { unique: true });
        let IndexFour = await ADMIN_USERS_COLLECTION.createIndex({ email: 1 }, { unique: true });
        if (!IndexOne || !IndexTwo || !IndexThree || !IndexFour) {
            return console.log("creation index probleme check please");
        }
    }
    catch (error) {
        console.error(error);
    }
}
// function for handeling undifined cases of an ObjectId
function isUndifinedObjectId(argument) {
    if (argument == undefined) {
        throw error;
    }
    return argument;
}
// function for .env importing
function GetElemFromEnv(argument) {
    try {
        if (process.env[argument] == undefined) {
            throw error;
        }
        return process.env[argument];
    }
    catch (error) {
        throw error;
    }
}
//function to check if schema is valable
function isRestaurantSchemeValable(argument) {
    try {
        let array = [
            "username",
            "restaurantname",
            "location",
            "city",
            "start_time",
        ];
        for (let elem of array) {
            if (!argument[elem]) {
                return false;
            }
        }
        return true;
    }
    catch (error) {
        console.log(error);
    }
}
//function to see if the admin user shem is valid
function isUserAdminSchemeValid(argument) {
    try {
        if (!argument.fullname.firstname ||
            !argument.fullname.lastname ||
            !argument.email ||
            !argument.isAdmin ||
            !argument.password) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.log(error);
    }
}
//handeling undifined stirng
function isUndefinedString(argument) {
    if (argument == undefined) {
        throw error;
    }
    return argument;
}
//check if object undifined
function isUndefinedObject(argument) {
    if (argument == undefined) {
        throw error;
    }
    return argument;
}
//verifying the required fields
function isUserSchemeValid(argument) {
    try {
        let array = ["fullname", "email", "password"];
        if (!argument.fullname.firstname ||
            !argument.fullname.lastname ||
            !argument.password ||
            !argument.email) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.log(error);
    }
}
let ServerParameters = {
    HandlingConnection: HandlingConnection,
    ServerSetup: ServerSetup,
    IndexesCreation: IndexesCreation,
    restaurants: restaurants,
    categories: categories,
    isUndifinedObjectId: isUndifinedObjectId,
    isUndefinedString: isUndefinedString,
    isRestaurantSchemeValable: isRestaurantSchemeValable,
    isUndefinedObject: isUndefinedObject,
    isUserSchemeValid: isUserSchemeValid,
    isUserAdminSchemeValid: isUserAdminSchemeValid,
    GetElemFromEnv: GetElemFromEnv,
};
export default ServerParameters;
//# sourceMappingURL=functions.js.map