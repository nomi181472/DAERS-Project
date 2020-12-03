import { UserSchema, UserAttrs, UserDocument } from "./user-repo/user-repo";
import { BadRequestError } from "../errors/bad-request-error";
export class User {
  constructor() {}
  public async signUp(user: UserAttrs) {
    const users = await UserSchema.build(user);
    await users.save();
    return users;
  }
}
