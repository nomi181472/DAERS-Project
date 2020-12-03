import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/user", {
      //"mongodb://userdb-mongo-srv:27017"
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to Usermongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3010, () => {
    console.log("User Listening on port 3010");
  });
};
start();
