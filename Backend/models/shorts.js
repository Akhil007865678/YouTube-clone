import mongoose from "mongoose";

const ShortsSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    videoType: {
        type: String,
        default: "All",
    },
    like: {
        type: Number,
        default: 0,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{timestamps: true});

export default mongoose.model("Shorts", ShortsSchema);