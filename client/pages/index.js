import axios from "axios";
import Link from "next/link";

const LandingPage = () => {
  //console.log("index",currentUser);
 
// let exerciseList;
// if(exercises){
//  exerciseList=exercises.exercise.map(ex=>{
//    return (
//      <tr key={ex.id}>
//        <td>{ex.exerciseName}</td>
//        <td>{ex.exerciseCategory}</td>
//        <td>{ex.level}</td>
//        <td>{ex.modality}</td>
//        <td>{ex.joint}</td>
//        <td>{ex.type}</td>
//        <td>{ex.direction}</td>
//        <td>{ex.photos.mainPhoto}</td>

//        <td>
//         <Link href="/customexercise/[exercisedetailsId]" as={`/customexercise/${ex.id}`}>
//     <a>add</a>
//         </Link>
//        </td>
//      </tr>
//    )
//  });
//   return (<div>
//     <h1>Exercies</h1>
//     <table className="table">
//       <thead>
//         <tr>
//         <th>
//             Name
//           </th>
//           <th>
//             Category
//           </th>
//           <th>
//             Level
//           </th>
//           <th>
//             Modality
//           </th>
//           <th>
//             Joint
//           </th>
//           <th>
//             Type
//           </th>
//           <th>
//             Direction
//           </th>
//           <th>
//             Image
//           </th>
//           <th>
//             Click to Add
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//       {exerciseList}
//       </tbody>
//     </table>
//   </div>)}
//   else
  return (<div>
    LandingPage
  </div>)
};

// LandingPage.getInitialProps = async (context,client,currentUser) => {
//   //client.defaults.baseURL="http://localhost:3010/api-gateway/next-user/"
//   //console.log(currentUser);
  
//   const res = await fetch('http://localhost:3020/api-gateway/current-user/exercise',{ credentials: 'include'})
  
//   const ex = await res.json()
//   //console.log(json);
//   if (ex){
//     return { exercises: ex }
//   }
//   else{
//     return { exercises: null }
//   }




//   // /**  */ const response = await buildClient(req);
//   // //console.log(response);
//   // try {
//   //   const { data } = await buildClient(req).get("user", {
//   //     withCredentials: true,
//   //   });
//   //   return data;
//   // } catch (err) {
//   //   console.log(err);
//   //   //   const { data } = await buildClient(req).get("user", {
//   //   //     withCredentials: true,
//   //   //   });
//   //   // // return data;
//   //   try {
//   //     const response = await axios.get(
//   //       "http://localhost:3010/api-gateway/current-user/user",
//   //       { withCredentials: true }
//   //     );

//   //     return response.data;
//   //   } catch (err) {
//   //     return { currentUser: null };
//   //   }
//   //   //return { currentUser: null };
//   // }

  
// }
export default LandingPage;
