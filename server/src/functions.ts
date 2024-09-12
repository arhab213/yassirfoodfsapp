import { error } from "console"
import dotenv from "dotenv"
dotenv.config()
import http from "http"
import bodyparser from "body-parser"
import express ,{Router,Response}from "express"
import * as mongoDB from "mongodb"
import { MongoClient } from "mongodb"
import cors from "cors"

//variables connection dependencies 
let uri:string = GetElemFromEnv("CLUSTER_STRING")
let ConnectionState={0:"disconnected to DB",1:"Connected to DB"}
let Client :mongoDB.MongoClient= new MongoClient(uri)
// function server setup 
let app:any
//typin element of the MappedElments 
export interface MappedElments {
    "path":string,
    "route":Router
}
function ServerSetup(argument:Array<MappedElments>){
app=express()
http.createServer(app)
app.use(bodyparser.json({"limit":"50mb"}))
app.use(cors({"origin":"*"}))
argument.map((e)=>{return app.use(e.path,e.route)}) //returning routes and their path 
let PORT = Number(GetElemFromEnv("LOCAL_HOST_PORT")) 

app.listen(PORT,()=>{
    console.log(`server connected on ${"port " + PORT }`);
})

}


//db and collections varibles
let db=Client.db("ShopDb")
let restaurants:mongoDB.Collection= db.collection("restaurant")
let categories:mongoDB.Collection= db.collection("categories")
let offers:mongoDB.Collection =db.collection("offers")



//functions used in main.ts
function HandlingConnection(set:boolean){
    if(set){
        Client.connect().catch(error=>{throw error})
        console.log(ConnectionState[1]);     // log need to be removed
        return ConnectionState[1]
    }

 Client.close().catch(error=>{throw error})
 console.log(ConnectionState[0]);         //log need to be removed
 return ConnectionState[0]

}

//handeling undifined function 

function isUndifinedObjectId(argument:any){
    if(argument==undefined) throw error
return argument
}


//function for handeling undifined case of vars wihch are imported from .env
function GetElemFromEnv(name:string){
    if(process.env[name]==undefined) throw error
    return process.env[name]
}


// Indexation collections 
async function IndexesCreation(){
    try {
        const IndexationOne = await restaurants.createIndex({_id:1})
        if(!IndexationOne){
          return console.log({"message":"error 5"});//🔥
          
        }
        const IndexationTwo = await restaurants.createIndex({restaurantname:1})
        if(!IndexationTwo){
            return console.log({"message":"error 5"});//🔥
            
          }
    
     
    return  console.log("created"); //🔥
    } catch (error) {
        throw error
    }
}

//typing object to send to modules export 
interface ServerParametersType{
 "HandlingConnection":(set:boolean)=>void,
   "Client":mongoDB.MongoClient,
   "restaurants":mongoDB.Collection,
   "isUndifinedObjectId":(argument:any)=>mongoDB.ObjectId,
   "ServerSetup":(argument:Array<MappedElments>)=>void,
   "app":any,
   "IndexesCreation":()=>void


}
let ServerParameters:ServerParametersType={
   "HandlingConnection":HandlingConnection,
    "Client":Client,
    "restaurants":restaurants,
    "isUndifinedObjectId":isUndifinedObjectId,
    "ServerSetup":ServerSetup,
    "app":app,
    "IndexesCreation":IndexesCreation

}
export default ServerParameters