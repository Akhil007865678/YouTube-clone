import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './search.css';

const Search = ({ sideNavbar }) => {
  const [filter, setFilter] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  
  const fetchVideo = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/allvideo');
      setFilter(response.data.videos);
      setVideos(response.data.videos);
    } catch (error) {
      console.log('Error fetching videos:', error);
    }
  };
  
  useEffect(() => {
    if (!id) {
      setVideos(filter);
    } else {
      const filtered = filter.filter(
        (video) =>
          video.title.toLowerCase().includes(id.toLowerCase()) ||
          video.user?.channelName?.toLowerCase().includes(id.toLowerCase())
      );
      setVideos(filtered);
    }
  }, [id, filter]);

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
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
                    src={video?.user?.profilePic || 'https://via.placeholder.com/50?text=No+Profile'}
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

export default Search;
