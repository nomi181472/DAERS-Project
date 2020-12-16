import Link from "next/link";
const listExercise=({data})=>{
    console.log(data);
    console.log("running");
let exerciseList;
if(data){
exerciseList=data.exercise.map(ex=>{
  return (
    <tr key={ex.id}>
      <td>{ex.exerciseName}</td>
      <td>{ex.exerciseCategory}</td>
      <td>{ex.level}</td>
      <td>{ex.modality}</td>
      <td>{ex.joint}</td>
      <td>{ex.type}</td>
      <td>{ex.direction}</td>
      <td>{ex.photos.mainPhoto}</td>

      <td>
       <Link  href="/customexercise/[exercisedetailsId]" as={`/customexercise/${ex.id}`}>
   <a className="btn btn-primary  active form-group">add</a>
       </Link>
      </td>
    </tr>
  )
});
 return (<div>
   <h1>Exercies</h1>
   <table className="table">
     <thead>
       <tr>
       <th>
           Name
         </th>
         <th>
           Category
         </th>
         <th>
           Level
         </th>
         <th>
           Modality
         </th>
         <th>
           Joint
         </th>
         <th>
           Type
         </th>
         <th>
           Direction
         </th>
         <th>
           Image
         </th>
         <th>
           Click to Add
         </th>
       </tr>
     </thead>
     <tbody>
     {exerciseList}
     </tbody>
   </table>
 </div>)}
 else
 return null;
}

listExercise.getInitialProps=async (context,client,currentUser)=>{
//console.log("exercise/list",currentUser);
//here is admin
if(currentUser)
    if(typeof window==="undefined"){
      
        console.log("server  side");
        client.defaults.baseURL  ="http://localhost:3020/api-gateway/current-user/exercise";
       // console.log(context.req.headers);
      const {data}=await client.get("",{headers: context.req.headers,});
      client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/";
      return {data};
    }
    
    else{
        const response=await fetch("http://localhost:3020/api-gateway/current-user/exercise",{credentials:"include"})
        const data=await response.json()
        //console.log("response",data);
        return {data};
    }


}
export default listExercise;
