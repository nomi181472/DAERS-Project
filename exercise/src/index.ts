import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { currentUserRouter } from "./current-user";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());
app.use(currentUserRouter);
//app.get("/api-gateway/current-user/exercise");
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/exercise", {
      //"mongodb://userdb-mongo-srv:27017"
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to ExerciseMongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3020, () => {
    console.log("Exercise Listening on port 3020");
  });
};
start();
