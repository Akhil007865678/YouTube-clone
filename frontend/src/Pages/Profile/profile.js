import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);


    const fetchVideo = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/userVideo', {
                withCredentials: true,
            });
            console.log(response.data.user.subscribersCount);
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
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />
      <div className={sideNavbar ? 'profile_page' : 'profile_pageprofile_page_inactive'}>
        
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={ user?.profilePic }
              alt="Profile"
            />
          </div>
          <div className="profile_top_section_about">
            <div className="profile_top_section_about_name">
              {user?.channelName}
              <div className='profile_right_section'>
                <div className='child_section'>
                  <h3 className='subscriber'>Subscribers</h3>
                  <h4 className='subscriberNumber'>{user?.subscribersCount}</h4>
                </div>
                <div className='child_section'>
                  <h3 className='subscriber'>Likes</h3>
                  <h4 className='subscriberNumber'>{}hello</h4>
                </div>
              </div>
            </div>
            <div className="profile_top_section_info">
              {user?.userName} · {} videos
            </div>
            <div className="profile_top_section_info">
              {user?.about}
            </div>
          </div>
        </div>

        <div className="profile_videos">
          <div className="profile_video_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="profileVideos">
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
                                    <div className="youtube_channelName">{user?.channelName}</div>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
