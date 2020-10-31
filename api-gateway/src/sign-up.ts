import express, {Response,Request} from "express";
import {body} from "express-validator";
const router=express.Router();
router.post("/api-gateway/sign-up/user",(req:Request,res:Response)=>{
    
    res.send({message:"sign-up"});
}); 
export {router as signUpRouter};