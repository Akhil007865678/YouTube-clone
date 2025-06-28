import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const UserVideo = ({ sideNavbar = true }) => {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userVideo`, {
                withCredentials: true,
            });
            console.log(response.data.user);
            setUser(response.data.user);
            if (response.data && response.data.videos) {
                setVideos(response.data.videos);
            } else {
                throw new Error("Invalid API response structure");
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            setError("Unable to load videos. Please try again later.");
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    return (
        <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
            <div className="homePage_options">
                <div className="homePage_option">Your Videos</div>
            </div>

            <div className={sideNavbar ? 'home_mainPage' : 'fullHome_mainPage'}>
                {error ? (
                    <div className="errorMessage">{error}</div>
                ) : videos.length > 0 ? (
                    videos.map((video) => (
                        <Link key={video._id} to={`/watch/${video._id}`} className="youtube_Video">
                            <div className="youtube_thumbnailBox">
                                <img
                                    src={video.thumbnail || 'https://via.placeholder.com/300x180?text=No+Thumbnail'}
                                    alt="Thumbnail"
                                    className="youtube_thumbnailPic"
                                />
                                <div className="youtube_timingThumbnail">{video.duration || '00:00'}</div>
                            </div>
                            <div className="youtubeTitleBox">
                                <div className="youtubeTitleBoxProfile">
                                    <img
                                        src={user?.profilePic}
                                        alt="Profile"
                                        className="youtube_thumbnail_profile"
                                    />
                                </div>
                                <div className="youtubeTitleBox_title">
                                    <div className="youtube_videoTitle">{video?.title || 'Untitled'}</div>
                                    <div className="youtube_channelName">{video?.user?.channelName || 'Unknown Channel'}</div>
                                    <div className="youtube_videoViews">{video?.like || 0} likes</div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>No videos available</div>
                )}
            </div>
        </div>
    );
};

export default UserVideo;
