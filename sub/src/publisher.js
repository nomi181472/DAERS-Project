const nats = require("node-nats-streaming");

let stan = nats.connect("daers", "abc", {
  url: "http://localhost:4222",
});


stan.on("connect", () => {
  console.log("Publisher connected to NATS");
  const data = JSON.stringify({
    id: "123",
    title: "connect",
    price: 20,
  });
  stan.publish("daers:created", data, () => {
    console.log("event Published");
  });
});


