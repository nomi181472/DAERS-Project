import mongoose from "mongoose";
import { Password } from "./password";
import mongoosePaginate from 'mongoose-paginate-v2';
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
      
    },
    bmi: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
    },
    userInformation: {
      targetGoal: Number,
      gene:String
    },
    services: {
      customExercise: Boolean,
      customDiet: Boolean,
      recommendedExercise: Boolean,
      RecommendedDiet:Boolean
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
        ret.id = ret._id;
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
  userInformation?: {
    [targetGoal: string]: string,
    
  }
  services?: {
    customExercise: Boolean,
    customDiet: Boolean,
    recommendedExercise: Boolean,
    RecommendedDiet: Boolean
  };
  createdAt?: Date;
  updatedAt?: Date;
  photos?: {
    photosUrl: String[],
    mainPhoto: String,
    updatedMainPhoto: {
      type: Date,
      Default: Date,
    },
  },
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
  userInformation?: {
    [targetGoal: string]:number
  }
  services?: {
    customExercise: Boolean,
    customDiet: Boolean,
    recommendedExercise: Boolean,
    RecommendedDiet: Boolean
  };
  createdAt?: Date;
  updatedAt?: Date;
  photos?: {
    photosUrl: String[],
    mainPhoto: String,
    updatedMainPhoto: {
      type: Date,
      Default: Date,
    },
  },
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
userSchema.plugin(mongoosePaginate);
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
