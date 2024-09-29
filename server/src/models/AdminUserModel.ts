import { CallbackError, model, Document, Schema } from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import * as mongoDb from "mongodb";
interface AdminUserType extends Document {
  fullname: {
    firstname: string;
    lastname: string;
  };
  DateOfBirth: string;
  email: string;
  password: string;
  image: string;
  //field for proprieties need to have at least one
  shops: Array<String>;
  isAdmin: true;
  JoinedAt: Date;
}

const AdminUser = new Schema<AdminUserType>({
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
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  shops: {
    type: [String],
    required: true,
    validate: {
      //accept only arrays with length which are sup of one
      validator: function (value) {
        return value.length >= 1;
      },
    },
  },
  isAdmin: {
    required: true,
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminUser.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    const saltvalue = await bcrypt.genSalt(8);
    const HashedPassword = await bcrypt.hash(this.password, saltvalue);
    this.password = HashedPassword;
  } catch (error) {
    next(error as CallbackError);
  }
});

export const AdminUserModel = model<AdminUserType>("AdminUser", AdminUser);
