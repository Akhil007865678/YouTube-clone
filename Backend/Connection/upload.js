import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import Video from '../models/video.js';  // Make sure the Video model is correct

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'videos',
    resource_type: 'video',
    format: async () => 'mp4',
  },
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'images',
    resource_type: 'image',
    format: async () => 'jpg',
  },
});

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      req.storage = videoStorage;
    } else if (file.mimetype.startsWith('image/')) {
      req.storage = imageStorage;
    }
    cb(null, true);
  },
});

// Ensure multer handles video uploads and then save the URL
export const uploadVideo = async (req, res) => {
  upload.single('videoFile')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading video' });
    }

    try {
      // Check if the file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded' });
      }

      // Retrieve the video URL from Cloudinary
      const videoUrl = req.file.path;  // The Cloudinary URL for the uploaded video

      // Ensure the request contains the necessary fields
      if (!req.body.title || !req.body.description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      // Create the Video document and save it to the database
      const newVideo = new Video({
        userId: req.user._id,  // Make sure you're sending the user ID (from authentication)
        title: req.body.title,  // Title sent in the body
        description: req.body.description,  // Description sent in the body
        videoLink: videoUrl,  // Save the Cloudinary video URL here
        thumbnail: req.body.thumbnail,  // Optional: Thumbnail if provided
        videoType: req.file.mimetype,  // The file type (e.g., mp4)
      });

      // Save the video document to the database
      await newVideo.save();

      res.status(201).json({
        message: 'Video uploaded successfully!',
        video: newVideo,  // Return the saved video data
      });
    } catch (err) {
      console.error('Error uploading files and saving URLs:', err);
      res.status(500).json({ error: 'Error uploading files and saving URLs', details: err });
    }
  });
};

export default upload;
