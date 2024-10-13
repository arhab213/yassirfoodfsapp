import { Schema, Document, CallbackError, model } from "mongoose";
import bcrypt from "bcrypt";

interface PublicUserType extends Document {
  fullname: {
    firstname: string;
    lastname: string;
  };
  DateOfBirth: string;
  email: string;
  phone: string;
  password: string;
  image: string;
  joinedAt: Date;
}

const PublicUser = new Schema<PublicUserType>({
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  DateOfBirth: {
    //put it required in the front
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: new Date(),
  },
});
PublicUser.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const saltvalue = await bcrypt.genSalt(8);
    const HashedPassword = await bcrypt.hash(this.password, saltvalue);
    this.password = HashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const PublicUserModel = model<PublicUserType>("PublicUser", PublicUser);
