import express from "express";
const router=express.Router();
router.get("/api-gateway/user/*",(req,res)=>{
    res.send("Routing-policy->get->user");
});
router.post("/api-gateway/user/*",(req,res)=>{
    const path=get_path(req.originalUrl)  
    res.send(req.originalUrl+" path replaced "+path);
});

const get_path=(url:string)=>{
        return url.replace("/api-gateway","");    
   
}
module.exports=router;
