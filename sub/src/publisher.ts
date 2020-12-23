import nats from "node-nats-streaming";
import { EScheduleCreatedPublisher } from "./events/ESchedule-Created-Event-Publisher";

console.clear();
let stan = nats.connect("daers", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");
  const publisher = new EScheduleCreatedPublisher(stan)
  try {
    await publisher.publish({ id: "123", title: "concert", price: 20 })
  }
  catch (err) {
    console.error(err);
  }
  // const data = JSON.stringify({
  //   id: "123",
  //   title: "connect",
  //   price: 20,
  // });
  // stan.publish("daers:created", data, () => {
  //   console.log("event Published");
  // });
});
