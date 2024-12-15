import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
    },
    subscribersCount:{
        type: Number,
        default: 0,
    },
    subscription: { 
        type: [mongoose.Schema.Types.ObjectId], default: [] 
    },
    subscribed:{
        type: Number,
        default: 0,
    },
    likedVideo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
},{timestamps:true})

export default mongoose.model("User", userSchema);