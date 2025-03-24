import express from "express";
import videoController from "../controllers/videos.js";
const { 
    getAllVideo, getVideoById, getAllVideoByUserId, 
    userVideo, videoUpload, updateLike, shortsUpload, 
    getAllShorts, updateShortsLike 
} = videoController;
import auth from '../middleware/authentication.js';
import upload from '../middleware/uploading.js';

const router = express.Router();

router.post('/videoupload', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), videoUpload);
router.post('/shortsupload', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), shortsUpload);
router.get('/allvideo', getAllVideo);
router.get('/allshorts', getAllShorts);
router.get('/getVideoById/:id', getVideoById);
router.get('/:userId/channel', getAllVideoByUserId);
router.patch('/likes/:id', updateLike);
router.patch('/shortlikes/:id', updateShortsLike);
router.get('/userVideo', auth, userVideo);

export default router;
