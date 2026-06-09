import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [3, "Password must be at least 3 characters"],
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      default: undefined,
    },
    resetTokenExpiry: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
