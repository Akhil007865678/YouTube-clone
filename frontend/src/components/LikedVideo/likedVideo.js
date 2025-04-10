import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LikedVideo = ({ sideNavbar }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTokenFromCookie = () => {
    const cookies = document.cookie;
    const cookieArray = cookies.split(';');
    const tokenCookie = cookieArray.find(cookie => cookie.trim().startsWith('token='));
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }
    return null;
  };  

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const userId = getTokenFromCookie();
        const response = await axios.get('http://localhost:4000/auth/likedVideo', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userId}`,
            },
        });
        setVideos(response.data.likedVideos || []);
      } catch (error) {
        console.error('Failed to fetch liked videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLikedVideos();
  }, []);

  return (
    <div className={sideNavbar ? 'searchPage' : 'fullHomePage1'}>
      <div className="homePage_options">
        <div className="homePage_option">Liked Videos</div>
      </div>
      <div className={sideNavbar ? 'home_mainPage1' : 'fullHome_mainPage1'}>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <Link key={video._id} to={`/watch/${video._id}`} className="youtube_Video">
                    <div className="youtube_thumbnailBox">
                      <img
                        src={video.thumbnail || 'https://via.placeholder.com/300x180?text=No+Thumbnail'}
                        alt="Thumbnail"
                        className="youtube_thumbnailPic"
                      />
                      <div className="youtube_timingThumbnail">28:05</div>
                    </div>
                    <div className="youtubeTitleBox">
                      <div className="youtubeTitleBoxProfile">
                        <img
                          src={video?.user?.profilePic || 'https://via.placeholder.com/50?text=No+Profile'}
                          alt="Profile"
                          className="youtube_thumbnail_profile"
                        />
                      </div>
                      <div className="youtubeTitleBox_title">
                        <div className="youtube_videoTitle">{video?.title || 'Untitled'}</div>
                        <div className="youtube_channelName">{video?.user?.channelName || 'Unknown Channel'}</div>
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

export default LikedVideo;