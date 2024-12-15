import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allvideo');
        if (res.data.success && res.data.videos) {
          setVideos(res.data.videos);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        <Link to='/search/movies' className="homePage_option">Movies</Link>
        <Link to='/search/songs' className="homePage_option">Songs</Link>
        <Link to='/search/mixes' className="homePage_option">Mixes</Link>
        <Link to='/search/funny' className="homePage_option">Funny</Link>
      </div>

      <div className={sideNavbar ? 'home_mainPage' : 'fullHome_mainPage'}>
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
                    src={video?.User?.profilePic || 'https://via.placeholder.com/50?text=No+Profile'}
                    alt="Profile"
                    className="youtube_thumbnail_profile"
                  />
                </div>
                <div className="youtubeTitleBox_title">
                  <div className="youtube_videoTitle">{video?.title || 'Untitled'}</div>
                  <div className="youtube_channelName">{video?.User?.channelName || 'Unknown Channel'}</div>
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

export default HomePage;