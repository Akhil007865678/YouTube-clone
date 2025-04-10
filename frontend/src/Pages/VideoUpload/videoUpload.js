import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './videoUpload.css';

const VideoUpload = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoType, setVideoType] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };
    const token = localStorage.getItem('token');
    console.log(token);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!video || !thumbnail) {
            setMessage('Please select both a video and a thumbnail.');
            return;
          }
          
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoType', videoType);
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        
        try {
          const response = await axios.post('http://localhost:4000/api/videoupload', formData, {
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
                <div className='uploadBox1'>
                    <div className='uploadVideoTitle'>
                        <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                        Upload Video
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
                        <div className='uploadBtn_form' onClick={handleSubmit}>Upload</div>
                        <div className='uploadBtn_form' onClick={() => navigate('/')}>Home</div>
                    </div>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default VideoUpload;
