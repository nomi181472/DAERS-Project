
import Router  from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";
const exerciseDetails=({ex})=>{
    //console.log(ex);
    //card-img-top

        if(ex)
        {
          var date = new Date();
           const [sameDay, setSameDay] = useState( date.toISOString().substring(0, 10));
           const [sets, setSets] = useState(0);
           const [reps, setReps] = useState([]);
           const [discription,setDiscription]=useState([]);
          
         
          const exercise={
            exerciseName:ex.exerciseName,
            sets:sets,
              reps:reps,
              discription:[discription],
              photos:ex.photos.photosUrl

          }
         const day= [{
              sameExercise:ex.id,
              exercise:exercise,
              

          }]
          const document=[{
            sameDay:sameDay,
            day:day
            
          }];
           const {doRequest,errors}=useRequest({
             url:"http://localhost:3021/api-gateway/current-user/schedulee/5fd5b3751ef22a3528367d89",
            method:"put",
            body:{
              document:document
            },
            onSuccess:()=>console.log('temp'),
          })
      const onClick=()=>{
        doRequest()
        //console.log(document);
      
      }
      const cancelMe=()=>{
        Router.push("/");
      }
      const handleDiscripton=(e)=>{
        if(e.target.value)
        setDiscription(e.target.value);
        else
        setDiscription(" ");
      };

      const handleSets=(e)=>{
         setSets(e.target.value)
        setReps([10,10,10])
      }

    return (
      <div className="container  mt-0">
  
  <div className="card-group">
    <div className="card">
    <h2 className="" >{ex.photos.photosURL}</h2>
    <div className="card-body ">
    <h2 className="card-title ">{ ex.exerciseName}</h2>
   
      <div className="card-body">
      <table className="table table-borderless">
  <tbody>
  <tr>   
  <td className="card-text">Category</td>
  <td className="card-text">{ex.exerciseCategory}</td>
</tr>
<tr>
  <td className="card-text">Type</td>
  <td className="card-text">{ex.type}</td>
</tr>
<tr>
  <td className="card-text">Joint</td>
  <td className="card-text">{ex.joint}</td>
</tr>

<tr>
  <td className="card-text">Direction</td>
  <td className="card-text">{ex.direction}</td>
</tr>
<tr>
  <td className="card-text">Modality</td>
  <td className="card-text">{ex.modality}</td>
</tr>
<tr>
  <td className="card-text">Level</td>
  <td className="card-text">{ex.level}</td>
</tr>
<tr>
  <td  className="card-text">
      Select Date
  </td>
<td className="card-text"><input value={sameDay} onChange={(e)=>{setSameDay(e.target.value)}}type="date"/></td>
</tr>
<tr>
  <td className="card-text">Enter Sets</td>
  <td className="card-text"> <input onChange={handleSets} placeholder="your Sets here.."/></td>
</tr>
<tr>
  <td className="card-text">Your Discription</td>
<td className="card-text"><textarea onChange={handleDiscripton} className="form-control rounded-0" placeholder="Any note ......." rows="3"></textarea>
  </td>
  </tr>
 
<tr>
  <td className="card-text"></td>
  <td className="card-text text-right"><button onClick={onClick} className="btn btn-primary spaced">Confirm</button> </td>
  
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
      `
    }
  </style>
</div>

    
    )
  }
    else
    {   
        return null;
    }

}
exerciseDetails.getInitialProps=async(context,client,{currentUser})=>{
  //console.log("runned",currentUser);
  
   const {exercisedetailsid}=context.query;
   //console.log(exercisedetailsid)
  // console.log("ExerciseId server side");
  if(currentUser){
  if( typeof window ==="undefined"){
    console.log("exercise detail id server")
    //console.log( context.req.headers)
 //client.defaults.baseURL=`http://localhost:3020/api-gateway/current-user/exercise/${exercisedetailsid}`
 const response=await fetch(`http://localhost:3020/api-gateway/current-user/exercise/${exercisedetailsid}`,{headers: context.req.headers});
 //console.log("response",response);
 client.defaults.baseURL= "http://localhost:3010/api-gateway/current-user/"
   const ex=await response.json()
  console.log(ex);
   return {ex:ex};
  }
   else
  {
    console.log("exercise detail id clientSide")
    const res = await fetch(`http://localhost:3020/api-gateway/current-user/exercise/${exercisedetailsid}`,{ credentials: 'include'})
    const ex = await res.json()
    return {ex:ex};
  }}
  return {ex:null};;
  

}

export default exerciseDetails
