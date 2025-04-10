import { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import { Link } from 'react-router-dom';
import SideNavbar from '../../components/SideNavbar/sideNavbar';

const HistoryPage = (sideNavbar) => {
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
                const response = await axios.get('http://localhost:4000/User-history/fetch-history', {
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
        <SideNavbar sideNavbar={sideNavbar}/>
        <div className={sideNavbar ? 'home_mainPage3' : 'fullHomePage3'}>
            <div className="homePage_options">
              <div className="homePage_option">Your history</div>
            </div>
            <div className={sideNavbar ? 'search_mainPage3' : 'fullHome_mainPage3'}>
                {history.length > 0 ? (
                  history.map((item) => (
                    <Link key={item._id} to={`/watch/${item._id}`} className="youtube_Video">
                      <div className="youtube_thumbnailBox">
                        <img
                          src={item?.thumbnail}
                          alt="Thumbnail"
                          className="youtube_thumbnailPic"
                        />
                        <div className="youtube_timingThumbnail">28:05</div>
                      </div>
                      <div className="youtubeTitleBox">
                        <div className="youtubeTitleBoxProfile">
                          <img
                            src={item?.profilePic}
                            alt="Profile"
                            className="youtube_thumbnail_profile"
                          />
                        </div>
                        <div className="youtubeTitleBox_title">
                          <div className="youtube_videoTitle">{item?.title || 'Untitled'}</div>
                          <div className="youtube_channelName">{item?.channelName || 'Unknown Channel'}</div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No videos available</div>
                )}
            </div>
        </div> </>
    );
};

export default HistoryPage;
