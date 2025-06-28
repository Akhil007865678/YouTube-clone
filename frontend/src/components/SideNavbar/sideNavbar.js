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

const SideNavbar = ({sideNavbar}) => {
    const [userId, setuserId] = useState('');
    const [channel, setChannel] = useState([]);
 
    useEffect(() => {
      if (typeof InstallTrigger !== 'undefined') {
        console.log("Mozilla Firefox");
      } else if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        console.log("Google Chrome");
      } else if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
        console.log("Apple Safari");
      } else if (navigator.userAgent.includes("Edg")) {
        const token = localStorage.getItem('token');
        if (token && typeof token === 'string') {
          const decodedToken = jwtDecode(token);
          setuserId(decodedToken.userId);
        }
      } else {
        console.log("Unknown Browser");
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setuserId(decodedToken.userId);
          } catch (error) {
            console.error("Invalid token:", error);
          }
        }
      }
    }, []);
  
    useEffect(() => {
        const subscription = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/subscription`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`,
                },
            });
            setChannel(response.data.channels);
          } catch (error) {
            console.error('Failed to fetch liked videos:', error);
          }
        };
        subscription();
      }, []);

  return (
    <div>
      <div className={sideNavbar ? 'home-sideNavbar' : 'homeSideNavbarHide'}>
        <div className='home_sideNavbarTop'>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }} className={`home_sideNavbarTopOption`}>
                <HomeIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Home</div>
            </Link>
            <Link to={'/shorts'} style={{ textDecoration: 'none', color: 'inherit' }} className={`home_sideNavbarTopOption`}>
                <VideocamIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Shorts</div>
            </Link>
            <div className={`home_sideNavbarTopOption`}>
                <SubscriptionsIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Subscriptions</div>
            </div>
        </div>
        <div className='home_sideNavbarMiddle'>
            <div className={`home_sideNavbarTopOption`}>
                <div className='home_sideNavbarTopOptionTitle'>You</div>
                <ChevronRightIcon/>
            </div>

            <Link to={`/user/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }} className={`home_sideNavbarTopOption`}>
                <RecentActorsIcon/>
                <div to={`/user/${userId}`} className='home_sideNavbarTopOptionTitle'>Your Channel</div>
            </Link>
            <Link to={'/history'} style={{ textDecoration: 'none', color: 'inherit' }} className={`home_sideNavbarTopOption`}>
                <HistoryIcon/>
                <div className='home_sideNavbarTopOptionTitle'>History</div>
            </Link>
            <div className={`home_sideNavbarTopOption`}>
                <PlaylistAddIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Playlist</div>
            </div>
            <Link to={'/uservideo'} style={{ textDecoration: 'none', color: 'inherit' }} className={`home_sideNavbarTopOption`}>
                <SmartDisplayIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your videos</div>
            </Link>
            <Link to={'/save-later'} className={`home_sideNavbarTopOption`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <WatchLaterIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Watch later</div>
            </Link>
            <Link to={'/likevideo'} style={{ textDecoration: 'none', color: 'inherit' }} className={`home_sideNavbarTopOption`}>
                <ThumbUpIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Liked videos</div>
            </Link>
            <Link className={`home_sideNavbarTopOption`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ContentCutIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your clips</div>
            </Link>
        </div>
        <div className='home_sideNavbarMiddle'>
          <h4>Subscriptions :</h4>
            {channel.length > 0 ? (
            channel.map((channel) => (
                <Link to={`user/${channel._id}`} className='home_sideNavbarTopOption' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className='home_sideNavbar_ImgLogo' src={channel.profilePic} alt='....'/>
                    <div className='home_sideNavbarTopOperationTitleHeader'>{channel.channelName}</div>
                </Link>
            ))
            ) : (
            <div>Not subscribed any channel</div>
            )}
        </div>
      </div>
    </div>
  )
}

export default SideNavbar;
