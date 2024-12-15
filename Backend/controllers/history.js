import History from '../models/history.js';
export const addToHistory = async (req, res) => {
    try {
        const { videoId } = req.body;
        if (!videoId) {
            return res.status(400).json({ error: 'Video ID is required' });
        }
        const userId = req.user._id;
        const existingHistory = await History.findOne({ userId, videoId });
        if (!existingHistory) {
            const history = new History({ userId, videoId });
            await history.save();
        }
        res.status(200).json({ message: 'Video added to history' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const history = await History.find({ userId }).populate('videoId');
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default {addToHistory, getHistory};
