import { Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    isDeleted: boolean,
    resetToken?: string,
    resetTokenExpiry?: Date,
    createdAt: Date,
    updatedAt: Date
}