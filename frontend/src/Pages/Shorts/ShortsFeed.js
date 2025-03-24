import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentBankRoundedIcon from '@mui/icons-material/CommentBankRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import "./shortsfeed.css";
import { useParams } from "react-router-dom";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'; 

const ShortsFeed = () => {
  const { id } = useParams(); // Get video ID from URL (if available)
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [shorts, setShorts] = useState([]);
  const videoRefs = useRef({});
  const [isLiked, setIsLIked] = useState(false);

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
  const updateShortsLike = async (videoId) => {
    try {
      await axios.patch(`http://localhost:4000/api/shortlikes/${videoId}`);
    } catch (error) {
      console.error("Likes error:", error.response?.data || error.message);
    }
  };
  const islike = async (currentVideoId) => {
    console.log("current video id: ")
    console.log(currentVideoId)
        try {
            const userId = getTokenFromCookie();
            const response = await axios.get(
                `http://localhost:4000/auth/isliked/${currentVideoId}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userId}`,
                    },
                }
            );
            if (response.status === 200) {
                setIsLIked(response.data.Liked);
                console.log(isLiked)
            }
        } catch (error) {
            console.error('Liked error:', error.response?.data || error.message);
        }
  };
  const addLike = async (videoId) => {
            try {
                await axios.patch(
                    `http://localhost:4000/auth/like/${videoId}`,
                    {}, 
                    {  
                        withCredentials: true, 
                        headers: {
                          'Content-Type': 'application/json',
                        },
                    }
                );
            } catch (error) {
                console.error('Likes error:', error.response?.data || error.message);
            }
  };
  const addSubscriber = async (videoId) => {
    try {
        const userId = getTokenFromCookie();
        const response = await axios.patch(
            `http://localhost:4000/auth/subscribershorts/${videoId}`,
            { userId }, 
            { 
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                }
            }
        );
        alert('Subscribed successfully');
        console.log('Updated Subscriber Count:', response.data.data.subscribersCount);
    } catch (error) {
        console.error('Subscription error:', error.response?.data || error.message);
    }
  };
  const addSubscribe = async (videoId) => {
    try {
        const userId = getTokenFromCookie();
        const response = await axios.patch(
            `http://localhost:4000/auth/subscribeshorts/${videoId}`,
            { userId }, 
            { 
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                }
            }
        );
        alert('Subscribed successfully');
        console.log('Updated Subscriber Count:', response.data.data.subscribersCount);
    } catch (error) {
        console.error('Subscription error:', error.response?.data || error.message);
    }
  };
  const isSubscribe = async (currentVideoId) => {
          try {
              const userId = getTokenFromCookie();
              const response = await axios.get(
                  `http://localhost:4000/auth/issubscribed/${currentVideoId}`,
                  {
                      withCredentials: true,
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${userId}`,
                      },
                   }
              );
              
              if (response.status === 200) {
                  setIsSubscribed(response.data.subscribed);
              }
          } catch (error) {
              console.error('Subscription error:', error.response?.data || error.message);
          }
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
          const res = await axios.get("http://localhost:4000/api/allshorts");
          if (res.data.success && res.data.videos) {
              setShorts(res.data.videos);
              if (res.data.videos.length > 0) {
                  setCurrentVideoId(res.data.videos[0]._id); // Set initial video ID
              }
          } else {
              throw new Error("Invalid response structure");
          }
      } catch (err) {
          console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);
  useEffect(() => {
    if (currentVideoId) {
        islike(currentVideoId);
        isSubscribe(currentVideoId);
    }
}, [currentVideoId]);

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              const video = entry.target;
              if (entry.isIntersecting) {
                  video.play().catch((error) => console.log("Autoplay blocked:", error));
                  const videoId = video.getAttribute("data-id");
                  if (videoId) {
                      setCurrentVideoId(videoId);
                  }
              } else {
                  video.pause();
                  video.currentTime = 0;
              }
          });
      },
      { threshold: 0.8 }
  );

  Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
  });

  return () => observer.disconnect();
}, [shorts]);

  return (
    <div className="shorts-feed">
      {shorts.map((short) => (
        <motion.div
          key={short._id}
          className="shorts-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={(el) => (videoRefs.current[short._id] = el)}
            className="shorts-video"
            src={short.videoLink}
            loop
            playsInline
            controls
          ></video>
          <div className="video-details">
            <h3>{short.title}</h3>
            <p>{short.hashtags ? short.hashtags.join(" ") : ""}</p>
          </div>
          <div className="channel-info">
            <img src={short.channelProfile} alt="Profile" />
            <h4>{short.channelName}</h4>
            <div disabled={isSubscribed} className={isSubscribed ? 'subscribedBtnYoutube' : 'subscribeBtnYoutube'} onClick={() => { addSubscriber(short._id); addSubscribe(short._id);}}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</div>
          </div>
          <div className="action-buttons">
            <div className={isLiked ? "liked-btn" : "like-btn"} onClick={() => {updateShortsLike(short._id); addLike(short._id);}}>
            {isLiked ? (
              <FavoriteRoundedIcon />
              ) : (
              <FavoriteBorderIcon />
              )
            } 
            <p>{short.like}</p>
            </div>
            <CommentBankRoundedIcon />
            <SendOutlinedIcon />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ShortsFeed;
