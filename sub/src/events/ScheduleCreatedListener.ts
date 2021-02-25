import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { EScheduleCreatedEvent } from "./ESchedule-Created-Event";
import { Subjects } from "./subject";
import mongoose from "mongoose";
import { userSchema } from "./user-schema";
 export class EScheduleCreatedListener extends Listener<EScheduleCreatedEvent> {
   subject: Subjects.ExerciseScheduleCreated = Subjects.ExerciseScheduleCreated;
  queueGroupName = "queue-group-name"
  async onMessage(data: EScheduleCreatedEvent["data"], msg: Message)
  {
    msg.ack(); 
    const conn = await mongoose.createConnection('mongodb://localhost:27017/user',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const model = await mongoose.model("User", userSchema);
    var dat = await model.findOne({id:12})
    console.log(dat);
  
    console.log(conn.getClient())
    console.log("after ack", data);
  }
}