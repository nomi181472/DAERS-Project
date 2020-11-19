import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
router.get("/api-gateway/current-user/user", (req: Request, res: Response) => {
  //res.send({ message: "currentUser" });
  if (!req.session?.jwt) {
    //check if till session
    console.log(req.session);
    return res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(req.session.jwt, "noman"); //will be process.environment variable
    res.send({ currentUser: payload });
  } catch (err) {
    console.log(err);
    res.send({ currentUser: "not verified" });
  }
});
export { router as currentUserRouter };
