import  Router  from "next/router";
import {useState} from "react";

const Card=({schedulenf,schedulee,onDietSchedule,onExerciseSchedule})=>{
  const isExerciseSchedule=schedulee?true:false;
  const isDietSchedule=schedulenf?true:false;

    return(<div>
        <div className="flex justify-center" style={{margin:"5%"}}>
        <div className="mx-auto card bg-light">
        <div className="card-columns mx-auto d-flex justify-content-center col-12">
        <div className="container pa0 flex justify-center">
        
          {isExerciseSchedule &&<div className="card-body">
          <strong>    <h5 className="card-title">Exercise Schedule</h5></strong>
    <p className="card-text">Your total upcoming workouts: <strong>{schedulee[0].document.length}</strong></p>
    <button onClick={onExerciseSchedule} className="btn btn-primary">View Schedule</button>
            </div>}
            {!isExerciseSchedule &&
            <div className="card-body">
            <h5 className="card-title">Create Exercise Schedule</h5>
  <p className="card-text"> You can create your Exercise schedule here..</p>
  <button className="btn btn-primary">Create Schedule</button>
          </div>

            }
          
            <div className="vl" style={{"border-left": "6px solid gray",
  "height": "auto"}}></div>

{ isDietSchedule&&<div className="card-body">
              <h5 className="card-title">Diet Schedule</h5>
              <p className="card-text">Your total upcoming workouts: <strong>{schedulenf[0].document.length}</strong></p>
              <button onClick={onDietSchedule} className="btn btn-primary">View Schedule</button>
            </div>}
            { !isDietSchedule&&<div className="card-body">
              <h5 className="card-title">Create Diet Schedule</h5>
              <p className="card-text">You can create Diet schedule here..</p>
              <button className="btn btn-primary">Create Schedule</button>
            </div>}
          </div>
       </div>
        
    
</div>
        
        </div>
    </div>
    )
}
Card.getInitialProps=()=>{
  console.log("running")
}
export default Card;