import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import Video from '../models/video.js';
import mongoose from 'mongoose';


const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
};

const signUp = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Profile picture is required.' });
    }
    const { channelName, userName, about, password } = req.body;
    const isExist = await User.findOne({ userName });
    if (isExist) {
      return res.status(400).json({ error: 'Username already exists.' });
    }
    const profilePicUrl = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'profilePic',
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      channelName,
      userName,
      about,
      profilePic: profilePicUrl.secure_url,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

const signIn = async (req, res) => {
  try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });

      if (user && await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ userId: user._id }, 'key', { expiresIn: '1h' });
          res.cookie('token', token, cookieOptions);
          return res.json({ message: "Logged in successfully", success: "true", token });
      } else {
          return res.status(400).json({ error: 'Invalid Credentials' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

const logout = (req, res) => {
    res.clearCookie('token', cookieOptions).json({message: 'Logged out successfully'});
};

const subscribe = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const userId = await User.findById(video.User);
  try {
    const channel = await User.findById(userId);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    channel.subscribersCount += 1;
    await channel.save();
    res.status(200).json({
      message: 'Subscribed successfully',
      data: { subscribersCount: channel.subscribersCount },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const subscriber = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const video = await Video.findById(id);
  const channelId = await User.findById(video.User);
  try{
    const user = await User.findById(userId);
    if (user.subscription.includes(channelId)) {
      return res.status(400).json({ error: 'User already subscribed' });
    }
    user.subscription.push(channelId);
    user.subscribed += 1;
    await user.save();
    res.status(200).json({
      message: 'Subscribed successfully',
      data: { subscription: user.subscribed },
    });
  } catch(error){
    res.status(500).json({ error: "Server error"});
  }
}

const isSubscribed = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const video = await Video.findById(id);
  const channel = await User.findById(video.User);
  const channelId = channel._id;
  console.log(channelId)
  try{
    const user = await User.findById(userId);
    console.log(user.subscription.includes(channelId))
    if (user.subscription.includes(channelId)) {
      return res.status(200).json({subscribed: true});
    }
  } catch(error){
    res.status(500).json({ error: "Server error"});
  }
}

const videoLike = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try {
    const user = await User.findById(userId);
    const videoIdObject = new mongoose.Types.ObjectId(id);
    if (user.likedVideo.includes(videoIdObject)) {
      return res.status(400).json({ error: 'User already liked' });
    }
    user.likedVideo.push(videoIdObject);
    await user.save();
    res.status(200).json({ message: 'Liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const isvideoLiked = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try{
    const user = await User.findById(userId);
    if (user.likedVideo.includes(id)) {
      return res.status(200).json({ Liked: true });
    }
    res.status(200).json({
      message: 'Liked successfully',
      Liked: false
    });
  } catch(error){
    res.status(500).json({ error: "Server error"});
  }
}

const likedVideo = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const videoId = user.likedVideo;
  try{
    const videos = [];
    for(let id of videoId){
      const video = await Video.findById(id);
      if (video) {
        videos.push(video);
      }
    }
    res.status(200).json({
      message: 'Liked videos fetched successfully',
      likedVideos: videos,
    });
  } catch(error){
    res.status(500).json({ error: "Server error"});
  }
}

const subscription = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  try{
    const channels = [];
    for(let id of user.subscription){
      const subscribedChannel = await User.findById(id);
      if (subscribedChannel) {
        channels.push(subscribedChannel);
      }
    }
    res.status(200).json({
      message: 'subscribed channel fetched successfully',
      channels
    });
  } catch(error){
    res.status(500).json({ error: "Server error"});
  }
}

export default {
  signUp, signIn, logout, subscribe, 
  subscriber, isSubscribed, videoLike, 
  isvideoLiked, likedVideo, subscription
};
