import express, {Response,Request} from "express";
const router=express.Router();
router.get("/api-gateway/sign-out/user",(req:Request,res:Response)=>{
    res.send({message:"sign-out"});
}); 
export {router as signOutRouter};