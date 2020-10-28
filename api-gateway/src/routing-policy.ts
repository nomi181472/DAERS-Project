import express from "express";
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Routing-policy");
})
module.exports=router;
