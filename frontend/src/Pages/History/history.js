import { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import { Link } from 'react-router-dom';
import SideNavbar from '../../components/SideNavbar/sideNavbar';

const HistoryPage = (sideNavbar) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:4000/User-history/fetch-history', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setHistory(response.data.history);
            } catch (error) {
                console.log('Failed to fetch history', error);
            }
        };
        fetchHistory();
    }, []);

    return (
        <>
        <SideNavbar sideNavbar={sideNavbar}/>
        <div className={sideNavbar ? 'searchPage' : 'fullHomePage'}>
            <div className="homePage_options">
              <div className="homePage_option">Welcome to Video Platform</div>
            </div>
            <div className={sideNavbar ? 'search_mainPage' : 'fullHome_mainPage'}>
                {history.length > 0 ? (
                  history.map((item) => (
                    <Link key={item._id} to={`/watch/${item._id}`} className="youtube_Video">
                      <div className="youtube_thumbnailBox">
                        <img
                          src={item?.videoId?.thumbnail}
                          alt="Thumbnail"
                          className="youtube_thumbnailPic"
                        />
                        <div className="youtube_timingThumbnail">28:05</div>
                      </div>
                      <div className="youtubeTitleBox">
                        <div className="youtubeTitleBoxProfile">
                          <img
                            src={item?.user?.profilePic}
                            alt="Profile"
                            className="youtube_thumbnail_profile"
                          />
                        </div>
                        <div className="youtubeTitleBox_title">
                          <div className="youtube_videoTitle">{item?.videoId?.title || 'Untitled'}</div>
                          <div className="youtube_channelName">{item?.user?.channelName || 'Unknown Channel'}</div>
                          <div className="youtube_videoViews"><p>Watched on: {new Date(item.watchedAt).toLocaleString()}</p></div>
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
