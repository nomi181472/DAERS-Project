import express from "express";
import {json} from "body-parser"
const route=require("./routing-policy");
//import axios from "axios";
const app =express();
app.use(json());
app.use("/",route);
app.listen(3000,()=>{
    console.log("api-gateway listening to port number 3000!!");
});

