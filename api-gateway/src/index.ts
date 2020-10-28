import express from "express";
import {json} from "body-parser"
//import axios from "axios";
const app =express();
app.use(json());
app.listen(3000,()=>{
    console.log("api-gateway listening to port number 3111!!");
});
app.get("/apigateway/current",(req,res)=>{
    console.log("hello");
res.send("hi There");

});
app.get("/",(req,res)=>{

    console.log("hello");
res.send("hi There");

});

