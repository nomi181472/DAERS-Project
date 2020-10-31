import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {currentUserRouter} from "./current-user";
import {signInRouter} from "./sign-in";
import {signOutRouter} from "./sign-out";
import {signUpRouter} from "./sign-up";
import {errorHandler} from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
//const route=require("./routing-policy");
//import axios from "axios";
const app =express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all("*",async()=>{
    throw new UnknownRouteError;
});
app.use(errorHandler);

app.listen(3010,()=>{
    console.log("User Listening on port 3010");
});