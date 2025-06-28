import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const History = (sideNavbar) => {
    const [history, setHistory] = useState([]);
    
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
        const fetchHistory = async () => {
            try {
              const userId = getTokenFromCookie();
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/User-history/fetch-history`, {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userId}`,
                  },
                });
                console.log(response.data.video)
                setHistory(response.data.video);
            } catch (error) {
                console.log('Failed to fetch history', error);
            }
        };
        fetchHistory();
    }, []);

    return (
      <>
      <div className="homePage_options">
          <div className="homePage_option">History :</div>
        </div>
      <div className={sideNavbar ? 'homePage1' : 'fullHomePage1'}>
        <div className={sideNavbar ? 'home_mainPage1' : 'fullHome_mainPage1'}>
              {history.length > 0 ? (
                history.map((video) => (
                  <Link key={video._id} to={`/watch/${video._id}`} className="youtube_Video">
                    <div className="youtube_thumbnailBox">
                      <img
                        src={video.thumbnail || 'https://via.placeholder.com/300x180?text=No+Thumbnail'}
                        alt="Thumbnail"
                        className="youtube_thumbnailPic1"
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
                        <div className="youtube_videoViews1">{video?.like || 0} likes</div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div>No videos available</div>
              )}
            </div>
          </div></>
    );
};

export default History;