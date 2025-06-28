import React, { useEffect, useState } from 'react';
import './homePage.Module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExploreIcon from '@mui/icons-material/Explore';

const HomePage = ({ sideNavbar }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/allvideo`);
        if (res.data.success && res.data.videos) {
          setVideos(res.data.videos);
        } else {
          setError('Invalid response from server');
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
    <div className={sideNavbar ? 'homePage1' : 'fullHomePage1'}>
      <div className="homePage_options1">
        <Link to='/search/movies' className="homePage_option">Movies</Link>
        <Link to='/search/songs' className="homePage_option">Songs</Link>
        <Link to='/search/mixes' className="homePage_option">Mixes</Link>
        <Link to='/search/funny' className="homePage_option">Funny</Link>
      </div>

      <div className={sideNavbar ? 'home_mainPage1' : 'fullHome_mainPage1'}>
        {videos.length > 0 ? (
          videos.map((video) => {
            if (!video.User) return null;

            return (
              
            );
          })
        ) : (
          <div>No videos available</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
