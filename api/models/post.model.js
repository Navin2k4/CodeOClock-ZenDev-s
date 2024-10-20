import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    reactions: {
      like: {
        type: Number,
        default: 0,
      },
      heart: {
        type: Number,
        default: 0,
      },
      smile: {
        type: Number,
        default: 0,
      },
      anger: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;