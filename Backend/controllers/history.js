import Video from '../models/video.js';
import User from '../models/User.js';

export const addToHistory = async (req, res) => {
    try {
      const userId = req.user._id;
      const { id } = req.params;
      console.log("id: ", id, userId)
      const video = await Video.findById(id);
      if (!video) return res.status(404).json({ error: "Video not found" });
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.historyVideos.includes(id)) {
        return res.status(400).json({ message: "Video already saved" });
      }
      user.historyVideos.push(id);
      await user.save();
      res.status(200).json({ message: "Video saved successfully", historyVideos: user.historyVideos });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('historyVideos');
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const video = await Video.find({ _id: { $in: user.historyVideos } });
        res.status(200).json({ video: video });
    } catch (error) {
        console.error("Error fetching saved videos:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
        
};

export default {addToHistory, getHistory};
