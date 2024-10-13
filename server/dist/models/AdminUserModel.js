import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const AdminUser = new Schema({
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
        unique: true,
    },
    image: {
        type: String,
    },
    shops: {
        type: [String],
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
        if (this.isModified("password")) {
            const saltvalue = await bcrypt.genSalt(8);
            const HashedPassword = await bcrypt.hash(this.password, saltvalue);
            this.password = HashedPassword;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
export const AdminUserModel = model("AdminUser", AdminUser);
//# sourceMappingURL=AdminUserModel.js.map