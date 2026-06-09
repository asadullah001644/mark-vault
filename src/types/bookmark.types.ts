import { Document, Types } from "mongoose";

export interface IBookmark extends Document {
    userId: Types.ObjectId,
    title: string,
    url: string,
    description: string,
    tags: string[],
    isPublic: boolean,
    createdAt: Date,
    updatedAt: Date
}