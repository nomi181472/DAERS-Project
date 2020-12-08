import { UserSchema, UserAttrs, UserDocument } from "./user-repo/user-repo";
import { BadRequestError } from "../errors/bad-request-error";
export class User {
  constructor() {}
  public async signUp(user: UserAttrs) {
    this.checkEmailExist(user.email);
    const users = await UserSchema.build(user);
    await users.save();
    return users;
  }
  private async checkEmailExist(email: string) {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      //console.log("email in Use");
      //return res.send({ message: "email in Use" });
      throw new BadRequestError("email already in used");
    }
  }
}
