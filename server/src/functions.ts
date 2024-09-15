import dotenv from "dotenv"
dotenv.config()
import express,{Application,Router,Response,Request} from "express"
import http from "http"
import bodyParser from "body-parser"
import { MongoClient ,ObjectId} from "mongodb"
import * as mongoDB from "mongodb"
import cors from "cors"
import { error } from "console"

//the collections and db 
  //Client Creation and uri

let uri=GetElemFromEnv("CLUSTER_STRING")
const Client:mongoDB.MongoClient = new MongoClient (uri)
const db:mongoDB.Db =Client.db("ShopDb")
let restaurants:mongoDB.Collection=db.collection("restaurant")
let categories:mongoDB.Collection =db.collection("categories")
let offers:mongoDB.Collection=db.collection("offers")

//function for etablishing the db connection 
let ConnectionState={1:"Connected to the db",2:"Disconnected from db"}
function HandlingConnection(set:boolean){
    if(set){
     Client.connect()
     return console.log(ConnectionState[1])
    }
Client.close()
return console.log(ConnectionState[2])
}
//function for seeting up the server
let app:Application
interface SetupServerArgument{
    path:string,
    route:Router
}
// function for setting server 
function ServerSetup(argument:Array<SetupServerArgument>){
  app=express()
  http.createServer(app)
  app.use(bodyParser.json({limit:"50mb"}))
  app.use(cors({"origin":"*"}))
  argument.map((e)=>{return app.use(e.path,e.route)})
  let PORT=GetElemFromEnv("LOCAL_HOST_PORT")
  app.listen(PORT,()=>{
    console.log(`Connected to the port ${PORT}`)
  })
}
//creating indexes 
async function IndexesCreation(){
    try {
    let IndexOne = await restaurants.createIndex({_id:1})
    let IndexTwo = await restaurants.createIndex({restaurantname:1})
    if(!IndexOne || !IndexTwo){
        throw error({"message":"error 5"})
    }
    } catch (error) {
        throw error
    }
}
// function for handeling undifined cases of an ObjectId

function isUndifinedObjectId(argument:any){
    if(argument ==undefined){
        throw error
    }
return argument
}


// function for .env importing 
function GetElemFromEnv(argument:string){
if(process.env[argument] == undefined){
     throw error
}
return process.env[argument]  
}
interface ServerParmetersType {
    "HandlingConnection":(set:boolean)=>void,
    "SetupServer":(argument:Array<SetupServerArgument>)=>void,
    "IndexesCreation":()=>void,
    "restaurants":mongoDB.Collection,
    "isUndifinedObjectId":(argument:any)=>string

}



let ServerParameters ={
    "HandlingConnection":HandlingConnection,
    "ServerSetup":ServerSetup,
    "IndexesCreation":IndexesCreation,
    "restaurants":restaurants,
    "isUndifinedObjectId":isUndifinedObjectId

}

export default ServerParameters