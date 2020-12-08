import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/schedulee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to schedulee mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3021, () => {
    console.log("schedulee Listening on port 3021");
  });
};
start();
