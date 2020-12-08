import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";

import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
//const route=require("./routing-policy");
//import axios from "axios";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));

app.use(currentUserRouter);
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
