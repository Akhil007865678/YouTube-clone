import express from "express";
import userController from '../controllers/users.js';
const { 
    signUp, signIn, logout, 
    subscribe, subscriber, isSubscribed, 
    videoLike, isvideoLiked, likedVideo,
    subscription, subscribeShorts, subscriberShorts,
    fetchUserData, saveLater, fetchSavedVideos

} = userController;
import upload from '../middleware/upload.js';
import auth from '../middleware/authentication.js';

const router = express.Router();

router.post('/signup', upload.single('profilePic'), signUp);
router.post('/login', signIn);
router.post('/logout', logout);
router.patch('/subscribe/:id', auth, subscribe);
router.patch('/subscribeshorts/:id', auth, subscribeShorts);
router.patch('/subscriber/:id', auth, subscriber);
router.patch('/subscribershorts/:id', auth, subscriberShorts);
router.get('/issubscribed/:id', auth, isSubscribed);
router.patch('/like/:id', auth, videoLike);
router.post('/savelater/:id', auth, saveLater);
router.get('/fetchSavedVideos', auth, fetchSavedVideos);
router.get('/isliked/:id', auth, isvideoLiked);
router.get('/likedVideo', auth, likedVideo);
router.get('/subscription', auth, subscription);
router.get('/fetchUserData', auth, fetchUserData);
export default router;