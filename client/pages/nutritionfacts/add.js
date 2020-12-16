import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {useState} from "react";
const add=({currentUser})=>{
  // console.log(currentUser);
  if(currentUser){
    const [nutritionCategory,setNutritionCategory]=useState("");
    const [nutritionName,setNutritionName]=useState("");
    const [fats,setFats]=useState(0);
    const [carbohydrates,setCarbohydrates]=useState(0);
    const [protein,setProtein]=useState(0);
    const [calories,setCalories]=useState(0);
    const [photos,setPhotos]=useState([]);
    
    // const [forBack,setForBack]=useState([]);
    //const [disable,setDisable]=useState(false);
   // const [editOrConfirm,setEditOrConfirm]=useState("Confirm");
     const {doRequest,errors}=useRequest({
       url:`http://localhost:3030/api-gateway/current-user/nutritionfact`,
      method:"post",
      body:{
        nutritionCategory,
        nutritionName,
        fats,
        carbohydrates,
        protein,
        calories,
        photos
      },
      onSuccess:()=>console.log('successFull nutrition created'),
    })

 
  
const onClick=()=>{
doRequest();

}  


const cancelMe=()=>{
  Router.push("/nutritionfacts/list");
}

return (
<div className="container  mt-0">

<div className="card-group">
<div className="card">

<div className="card-body ">
<h2 className="card-title ">Add Nutrition</h2>

<div className="card-body">
<table className="table table-borderless">
<tbody>
<tr>   
<td className="card-text">Name</td>
<td className="card-text"><input value={nutritionName} onChange={(e)=>setNutritionName(e.target.value)} type="text"  /></td>
</tr>

    
<tr>   
<td className="card-text">Category</td>
<td className="card-text"><input value={nutritionCategory} onChange={(e)=>setNutritionCategory(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Fats</td>
<td className="card-text"><input value={fats} onChange={(e)=>setFats(e.target.value)} type="text" /></td>
</tr>
<tr>
<td className="card-text">Carbohydrates</td>
<td className="card-text"><input value={carbohydrates} onChange={(e)=>setCarbohydrates(e.target.value)} type="text" /></td>
</tr>

<tr>
<td className="card-text">Protein</td>
<td className="card-text"><input value={protein} onChange={(e)=>setProtein(e.target.value)} type="text"   /></td>
<td className="card-text">

</td>
</tr>
<tr>
<td className="card-text">Calories</td>
<td className="card-text"><input value={calories} onChange={(e)=>setCalories(e.target.value)} type="text"   /></td>
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