import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { addDiet } from "./routes/addDiet";
import { currentUser } from "./middlewares/current-user";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};

app.use(cors(corsOptions));;

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));
app.use(currentUser);
app.use(addDiet)
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
