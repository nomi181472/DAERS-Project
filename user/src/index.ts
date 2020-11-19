import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./current-user";
import { signInRouter } from "./sign-in";
import { signOutRouter } from "./sign-out";
import { signUpRouter } from "./sign-up";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
//const route=require("./routing-policy");
//import axios from "axios";

const app = express();

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, secure: true }));
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);

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
