import dotenv from "dotenv";
dotenv.config();
import express, { Application, Router, Response, Request } from "express";
import http from "http";
import bodyParser from "body-parser";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import * as mongoDB from "mongodb";
import cors from "cors";
import { error } from "console";
import cookieParser from "cookie-parser";

//the collections and db
//Client Creation and uri

let uri = GetElemFromEnv("CLUSTER_STRING");
const Client: mongoDB.MongoClient = new MongoClient(uri);
const db: mongoDB.Db = Client.db("ShopDb");
let restaurants: mongoDB.Collection = db.collection("restaurant");
let categories: mongoDB.Collection = db.collection("categories");
let offers: mongoDB.Collection = db.collection("offers");
const UserDB: mongoDB.Db = Client.db("test");
const Admin_user_collection = UserDB.collection("adminusers");
const Public_user_collection = UserDB.collection("publicusers");

//function for etablishing the db connection
let ConnectionState = { 1: "Connected to the db", 2: "Disconnected from db" };
function HandlingConnection(set: boolean) {
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
let app: Application;
interface SetupServerArgument {
  path: string;
  route: Router;
}
// function for setting server
function ServerSetup(argument: Array<SetupServerArgument>) {
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
    let IndexThree = await Public_user_collection.createIndex(
      { email: 1 },
      { unique: true }
    );

    if (!IndexOne || !IndexTwo || !IndexThree) {
      throw error({ message: "error 5" });
    }
  } catch (error) {
    throw error;
  }
}
// function for handeling undifined cases of an ObjectId

function isUndifinedObjectId(argument: any) {
  if (argument == undefined) {
    throw error;
  }
  return argument;
}

// function for .env importing
function GetElemFromEnv(argument: string) {
  if (process.env[argument] == undefined) {
    throw error;
  }
  return process.env[argument];
}
//function to check if schema is valable

function isSchemeValable(argument: { [key: string]: any }) {
  let array: Array<string> = [
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

//handeling undifined password

function isUndefinedString(argument: string) {
  if (argument == undefined) {
    throw error;
  }
  return argument;
}

//check if object undifined

function isUndefinedObject(argument: object) {
  if (argument == undefined) {
    throw error;
  }
  return argument;
}

//verifying the required fields

function isUserSchemeValid(argument: { [key: string]: any }) {
  let array = ["fullname", "email", "password"];
  for (let elem of array) {
    if (!argument[elem]) {
      return false;
    }
  }
  if (!argument["fullname"].firstname || !argument["fullname"].lastname) {
    return false;
  }
  return true;
}
//verifying object receved in the login endpoint

interface ServerParmetersType {
  HandlingConnection: (set: boolean) => void;
  ServerSetup: (argument: Array<SetupServerArgument>) => void;
  IndexesCreation: () => void;
  restaurants: mongoDB.Collection;
  isUndifinedObjectId: (argument: any) => string;
  isUndefinedString: (argument: any) => string;
  isSchemeValable: (argument: { [key: string]: any }) => boolean;
  isUndefinedObject: (argument: object) => object;
  isUserSchemeValid: (argument: { [key: string]: any }) => boolean;
  GetElemFromEnv: (argument: string) => string;
}

let ServerParameters: ServerParmetersType = {
  HandlingConnection: HandlingConnection,
  ServerSetup: ServerSetup,
  IndexesCreation: IndexesCreation,
  restaurants: restaurants,
  isUndifinedObjectId: isUndifinedObjectId,
  isUndefinedString: isUndefinedString,
  isSchemeValable: isSchemeValable,
  isUndefinedObject: isUndefinedObject,
  isUserSchemeValid: isUserSchemeValid,
  GetElemFromEnv: GetElemFromEnv,
};

export default ServerParameters;
