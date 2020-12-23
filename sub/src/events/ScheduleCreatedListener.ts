import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { EScheduleCreatedEvent } from "./ESchedule-Created-Event";
import { Subjects } from "./subject";
 export class EScheduleCreatedListener extends Listener<EScheduleCreatedEvent> {
   subject: Subjects.ExerciseScheduleCreated = Subjects.ExerciseScheduleCreated;
  queueGroupName = "queue-group-name"
  onMessage(data: EScheduleCreatedEvent["data"], msg: Message)
  {
    console.log("Event data:", data);
    msg.ack(); 
  }
}