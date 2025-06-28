import React, { useState, useEffect } from 'react';
import './sideNavbar.css';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const SideNavbar = ({ sideNavbar }) => {
  const [userId, setuserId] = useState('');
  const [channel, setChannel] = useState([]); // ✅ Properly initialized to an empty array

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setuserId(decodedToken.userId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // ✅ Prevent API call if userId is not available

    const subscription = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/subscription`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`,
          },
        });
        if (response.data?.channels) {
          setChannel(response.data.channels);
        }
      } catch (error) {
        console.error('Failed to fetch subscriptions:', error);
        setChannel([]); // ✅ Fallback to prevent undefined
      }
    };
    subscription();
  }, [userId]); // ✅ Include userId as dependency

  return (
    <div>
      <div className={sideNavbar ? 'home-sideNavbar' : 'homeSideNavbarHide'}>
        <div className='home_sideNavbarTop'>
          <Link to={'/'} className='home_sideNavbarTopOption'>
            <HomeIcon />
            <div className='home_sideNavbarTopOptionTitle'>Home</div>
          </Link>
          <Link to={'/shorts'} className='home_sideNavbarTopOption'>
            <VideocamIcon />
            <div className='home_sideNavbarTopOptionTitle'>Shorts</div>
          </Link>
          <div className='home_sideNavbarTopOption'>
            <SubscriptionsIcon />
            <div className='home_sideNavbarTopOptionTitle'>Subscriptions</div>
          </div>
        </div>

        <div className='home_sideNavbarMiddle'>
          <div className='home_sideNavbarTopOption'>
            <div className='home_sideNavbarTopOptionTitle'>You</div>
            <ChevronRightIcon />
          </div>

          <Link to={`/user/${userId}`} className='home_sideNavbarTopOption'>
            <RecentActorsIcon />
            <div className='home_sideNavbarTopOptionTitle'>Your Channel</div>
          </Link>
          <Link to={'/history'} className='home_sideNavbarTopOption'>
            <HistoryIcon />
            <div className='home_sideNavbarTopOptionTitle'>History</div>
          </Link>
          <div className='home_sideNavbarTopOption'>
            <PlaylistAddIcon />
            <div className='home_sideNavbarTopOptionTitle'>Playlist</div>
          </div>
          <Link to={'/uservideo'} className='home_sideNavbarTopOption'>
            <SmartDisplayIcon />
            <div className='home_sideNavbarTopOptionTitle'>Your videos</div>
          </Link>
          <Link to={'/save-later'} className='home_sideNavbarTopOption'>
            <WatchLaterIcon />
            <div className='home_sideNavbarTopOptionTitle'>Watch later</div>
          </Link>
          <Link to={'/likevideo'} className='home_sideNavbarTopOption'>
            <ThumbUpIcon />
            <div className='home_sideNavbarTopOptionTitle'>Liked videos</div>
          </Link>
          <Link to={'#'} className='home_sideNavbarTopOption'>
            <ContentCutIcon />
            <div className='home_sideNavbarTopOptionTitle'>Your clips</div>
          </Link>
        </div>

        <div className='home_sideNavbarMiddle'>
          <h4>Subscriptions :</h4>
          {Array.isArray(channel) && channel.length > 0 ? ( // ✅ Safe check
            channel.map((channel) => (
              <Link
                key={channel._id} // ✅ Key added for map
                to={`/user/${channel._id}`}
                className='home_sideNavbarTopOption'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  className='home_sideNavbar_ImgLogo'
                  src={channel.profilePic || 'https://via.placeholder.com/40'}
                  alt='Profile'
                />
                <div className='home_sideNavbarTopOperationTitleHeader'>
                  {channel.channelName || 'Unknown Channel'}
                </div>
              </Link>
            ))
          ) : (
            <div>Not subscribed to any channel</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
