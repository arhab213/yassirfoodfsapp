import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import cors from "cors";
import { error } from "console";
//the collections and db 
//Client Creation and uri
let uri = GetElemFromEnv("CLUSTER_STRING");
const Client = new MongoClient(uri);
const db = Client.db("ShopDb");
let restaurants = db.collection("restaurant");
let categories = db.collection("categories");
let offers = db.collection("offers");
//function for etablishing the db connection 
let ConnectionState = { 1: "Connected to the db", 2: "Disconnected from db" };
function HandlingConnection(set) {
    if (set) {
        Client.connect();
        return console.log(ConnectionState[1]);
    }
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
    app.use(cors({ "origin": "*" }));
    argument.map((e) => { return app.use(e.path, e.route); });
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
        if (!IndexOne || !IndexTwo) {
            throw error({ "message": "error 5" });
        }
    }
    catch (error) {
        throw error;
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
    if (process.env[argument] == undefined) {
        throw error;
    }
    return process.env[argument];
}
let ServerParameters = {
    "HandlingConnection": HandlingConnection,
    "ServerSetup": ServerSetup,
    "IndexesCreation": IndexesCreation,
    "restaurants": restaurants,
    "isUndifinedObjectId": isUndifinedObjectId
};
export default ServerParameters;
//# sourceMappingURL=functions.js.map