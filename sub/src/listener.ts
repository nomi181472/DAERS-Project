import nats, { Subscription, Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();
const stan = nats.connect("daers", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});
stan.on("connect", () => {
  console.log("listener connected to NATs");
stan.on("close",()=>{
  console.log("NATS connection closed!");
  process.exit(); 
});

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subsctiption = stan.subscribe(
    "daers:created",
    "listening-channel",
    options
  );
  subsctiption.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`recieved event #: ${msg.getSequence()}, with data:${data}`);
    }
    console.log("message Recieved");
    msg.ack();
  });
});



process.on("SIGNINT",()=>stan.close());

process.on("SIGTERM",()=>stan.close());