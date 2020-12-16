import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {useState} from "react";
const add=({currentUser})=>{
  // console.log(currentUser);
  if(currentUser){
    const [exerciseCategory,setExerciseCategory]=useState("");
    const [exerciseName,setExerciseName]=useState("");
    const [level,setLevel]=useState("");
    const [joint,setJoint]=useState("");
    const [type,setType]=useState("");
    const [modality,setModality]=useState("");
    const [direction,setDirection]=useState("");
    const [photosURL,setPhotosURL]=useState("");
    photosURL
    // const [forBack,setForBack]=useState([]);
    //const [disable,setDisable]=useState(false);
   // const [editOrConfirm,setEditOrConfirm]=useState("Confirm");
     const {doRequest,errors}=useRequest({
       url:`http://localhost:3020/api-gateway/current-user/exercise`,
      method:"post",
      body:{
       exerciseCategory,
       exerciseName,
       level,
       type,
       joint,
       direction,
       modality
      },
      onSuccess:()=>console.log('successFull'),
    })

 
  
const onClick=()=>{
doRequest();

}  


const cancelMe=()=>{
  Router.push("/exercises/list");
}

return (
<div className="container  mt-0">

<div className="card-group">
<div className="card">
<h2 className="" >{photosURL}</h2>
<div className="card-body ">
<h2 className="card-title ">Add Exercise</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={exerciseName} onChange={(e)=>setExerciseName(e.target.value)} type="text"  /></td>
</tr>
<tr>   
<td className="card-text">Category</td>
<td className="card-text"><input value={exerciseCategory} onChange={(e)=>setExerciseCategory(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Type</td>
<td className="card-text"><input value={type} onChange={(e)=>setType(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Joint</td>
<td className="card-text"><input value={joint} onChange={(e)=>setJoint(e.target.value)} type="text" /></td>
</tr>

<tr>
<td className="card-text">Direction</td>
<td className="card-text"><input value={direction} onChange={(e)=>setDirection(e.target.value)} type="text"   /></td>
<td className="card-text">

</td>
</tr>
<tr>
<td className="card-text">Modality</td>
<td className="card-text"><input value={modality} onChange={(e)=>setModality(e.target.value)} type="text"   /></td>
</tr>
<tr>
<td className="card-text">Level</td>
<td className="card-text"><input value={level} onChange={(e)=>setLevel(e.target.value)} type="text"  /></td>
</tr>
<tr>
<td className="card-text">{errors}</td>

</tr>



<tr>
<td className="card-text"></td>
<td className="card-text text-right"><button onClick={onClick} className="btn btn-primary spaced">Add</button> </td>

</tr>
<tr>
<td className="card-text"></td>
<td className="card-text text-right"> <button onClick={cancelMe}className="btn btn-primary spaced">Cancel</button></td>

</tr>


</tbody>
</table>
</div>
</div>
</div>
</div>
<style>
{
`
.mt-0 {
  margin-top: 20px !important;
}
.spaced{
  margin-left: 10px !important;
}
input[type="text"]:disabled {
  background: #dddddd;
}
`
}
</style>
</div>


)
}
else {
  return null
}
}
add.getInitialProps=(context,client,currentUser)=>{
  return currentUser
}




export default add;