import Comment from '../models/Comments.js';


const addComment = async (req, res) => {
    try {
        let { video, message } = req.body;
        if (!video || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const comment = new Comment({ User: req.user._id, video, message });
        await comment.save();
        res.status(201).json({
            message: "Success",
            comment
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Server error" });
    }
};


const getCommentByVideoId = async (req, res) => {
    try{
        let {videoId} = req.params;
        const comments = await Comment.find({video: videoId}).populate('User',"channelName profilePic userName createdAt");
        res.status(201).json({message: "Success", comments});
    } catch(error){
        res.status(500).json({error: "Server error"});
    }
}

export default {addComment, getCommentByVideoId};