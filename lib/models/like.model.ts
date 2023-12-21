import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
