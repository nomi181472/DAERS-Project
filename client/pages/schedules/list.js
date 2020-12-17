import fetch from "isomorphic-unfetch";
import Card from "./card";
import Router from "next/router";
import axios from "axios";
import ScheduleeList from "../customexercise/scheduleeList";
import {useState} from "react";
const list=({schedulenf,schedulee})=>{
    if(typeof schedulenf ==="undefined")
    {
        schedulenf=null
    }
    if(typeof schedulee ==="undefined")
    {
        schedulef=null
    }
    
    const [viewExerciseSchedule,setViewExerciseSchedule]=useState(false);
  const [location,setLocation]=useState([""]);
 
  const onExerciseSchedule=()=>{
      if(viewExerciseSchedule)
    setViewExerciseSchedule(false);
    else setViewExerciseSchedule(true)
}
const onDietSchedule=()=>{
 
    setLocation(["view-all-diet"]);
  console.log("click me");
 
}
const deleteDayE=async(date)=>{
    console.log(date);
    console.log();
    let data;
    try{
    const res =await axios.delete(`http://localhost:3021/api-gateway/current-user/schedulee/day/${schedulee[0].id}/${date}`,{withCredentials:"include"})
    //Router.reload()
    return true;
    }
    catch(err){
        console.log("unable to delete",err);
        return false;
    }

}
    
    return(
        <div>

{!viewExerciseSchedule&&(<Card schedulenf={schedulenf} schedulee={schedulee} onExerciseSchedule={onExerciseSchedule} onDietSchedule={onDietSchedule} />)}
        {viewExerciseSchedule  &&(<ScheduleeList deleteDayE={deleteDayE} onExerciseSchedule={onExerciseSchedule} schedulee={schedulee} />)  }
        </div>
    )
}
list.getInitialProps=async(context)=>{
    if(typeof window==="undefined")
    {
        const resnf=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include",headers: context.req.headers})
        const rese=await fetch("http://localhost:3021/api-gateway/current-user/schedulee-user/getschedule",{credentials:"include",headers: context.req.headers})
        const {schedulenf}=await resnf.json()
        const {schedulee}=await rese.json()
        return {schedulenf:schedulenf,schedulee:schedulee}
        
    }
    else
    {
        const resnf=await fetch("http://localhost:3031/api-gateway/current-user/schedulenf-user/getschedule",{credentials:"include"})
        const rese=await fetch("http://localhost:3021/api-gateway/current-user/schedulee-user/getschedule",{credentials:"include"})
        const {schedulenf}=await resnf.json()
        const {schedulee}=await rese.json()
        return {schedulenf:schedulenf,schedulee:schedulee}
    }
   
}

export default list