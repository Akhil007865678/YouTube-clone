import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './shortsUpload.css';

const ShortsUpload = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoType, setVideoType] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [message, setMessage] = useState('');
    const [isValidVideo, setIsValidVideo] = useState(false); // Track if video is valid

    const handleImageChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const videoElement = document.createElement("video");
            videoElement.preload = "metadata";
            
            videoElement.onloadedmetadata = () => {
                window.URL.revokeObjectURL(videoElement.src);
                if (videoElement.duration > 60) { // 60 seconds = 1 minutes
                    setMessage("Video must be shorter than 2 minutes.");
                    setIsValidVideo(false);
                } else {
                    setMessage("");
                    setVideo(file);
                    setIsValidVideo(true);
                }
            };

            videoElement.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!video || !thumbnail) {
            setMessage('Please select both a video and a thumbnail.');
            return;
        }

        if (!isValidVideo) {
            setMessage("Video must be shorter than 2 minutes.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoType', videoType);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        
        try {
            const response = await axios.post('http://localhost:4000/api/shortsupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading video');
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div>
            <div className='videoUpload'>
                <div className='uploadBox'>
                    <div className='uploadVideoTitle'>
                        <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                        Upload Shorts
                    </div>
                    <div className='uploadForm'>
                        <input
                            type='text'
                            placeholder='Title of video'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className='uploadFormInput'
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className='uploadFormInput'
                        />
                        <input
                            type='text'
                            placeholder='Category'
                            onChange={(e) => setVideoType(e.target.value)}
                            value={videoType}
                            className='uploadFormInput'
                        />
                        <div>
                            Thumbnail
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            Video
                            <input
                                type='file'
                                accept='video/mp4, video/webm, video/*'
                                onChange={handleVideoChange}
                            />
                        </div>
                    </div>
                    <div className='uploadBtn'>
                        <div className={`uploadBtn_form ${isValidVideo ? '' : 'disabled'}`} onClick={handleSubmit}>
                            Upload
                        </div>
                        <div className='uploadBtn_form' onClick={() => navigate('/')}>Home</div>
                    </div>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ShortsUpload;