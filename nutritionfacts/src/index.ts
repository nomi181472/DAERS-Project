import express, { Request, Response } from "express";
import { json } from "body-parser";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
const app = express();
app.use(json());
app.use(currentUserRouter);
app.get("*", (req: Request, res: Response) => {
  throw new UnknownRouteError();
});

app.use(errorHandler);

const start = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/nutritionfacts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to NutritionMongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3030, () => {
    console.log("NutritionFacts Listening on port 3030");
  });
};
start();
