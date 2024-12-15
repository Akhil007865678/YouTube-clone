import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},{timestamps: true});

export default mongoose.model("Comment", CommentSchema);