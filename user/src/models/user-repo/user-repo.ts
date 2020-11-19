import mongoose from "mongoose";
import { Password } from "./password";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 65,
    },
    bmi: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    weight: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    height: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    userInformation: {
      ques: [String],
      ans: [Boolean],
    },
    createdAt: {
      type: Date,
      Default: Date.now,
    },
    updatedAt: {
      type: Date,
      Default: Date.now,
    },
    photos: {
      photosUrl: [String],
      mainPhoto: String,
      updatedMainPhoto: {
        type: Date,
        Default: Date.now,
      },
    },
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
//newly user required information
interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  bmi: number;
  weight: number;
  height: number;
  userInformation?: {};
  createdAt?: Date;
  updatedAt?: Date;
  photos?: {};
}

//An interface that describe the properties of the user model
interface UserModel extends mongoose.Model<UserDocument> {
  build(user: UserAttrs): UserDocument;
}
//interface that describe the properties for the document (single user has)
interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  bmi: number;
  weight: number;
  height: number;
  userInformation?: {};
  createdAt?: Date;
  updatedAt?: Date;
  photos?: {};
}
userSchema.pre("save", async function (done) {
  if (this.isModified()) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (user: UserAttrs) => {
  return new UserSchema(user);
};
const UserSchema = mongoose.model<UserDocument, UserModel>("User", userSchema);
/*
const user=User.build({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  age: 23,
  bmi: 2.3,
  weight: 23.4,
  height: 2.3,
});
user.email;
user.unemai*/
/*
const build = (user: UserAttrs) => {
  return new User(user);
};
build({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  age: 23,
  bmi: 2.3,
  weight: 23.4,
  height: 2.3,
});*/
export { UserSchema, UserAttrs, UserDocument };
