import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const PublicUser = new Schema({
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
    }
    catch (error) {
        next(error);
    }
});
export const PublicUserModel = model("PublicUser", PublicUser);
//# sourceMappingURL=publicUserModel.js.map