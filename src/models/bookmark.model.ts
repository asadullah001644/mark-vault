import mongoose, { Schema } from "mongoose";
import { IBookmark } from "../types";

const bookmarkModel = new Schema<IBookmark>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Bookmark Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: [true, "Url for bookmark is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkModel);
export default Bookmark;
