import React, {useState, useEffect} from 'react'
import './video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [Videos, setVideos] = useState("");
    const {id} = useParams();
    const [comments, setComments] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLiked, setIsLIked] = useState(false);
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);

    const handleToggleComments = () => {
      setShowComments(prev => !prev);
    };

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
    
    const addToHistory = async (videoId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `http://localhost:4000/User-history/add-history/${id}`,
                { videoId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Video added to history:', response.data);
        } catch (error) {
            console.error('Failed to add video to history:', error.response?.data || error.message);
        }
    };

    const addSubscribe = async () => {
        try {
            const userId = getTokenFromCookie();
            const response = await axios.patch(
                `http://localhost:4000/auth/subscribe/${id}`,
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
            window.location.reload();
        } catch (error) {
            console.error('Subscription error:', error.response?.data || error.message);
        }
    };

    const addSubscriber = async () => {
        try {
            const userId = getTokenFromCookie();
            const response = await axios.patch(
                `http://localhost:4000/auth/subscriber/${id}`,
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

    const fetchVideoById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`,).then((response) => {
            setData(response.data.video);
            setUser(response.data.user);
            setVideoUrl(response?.data?.video?.videoLink);
        }).catch(error => {
            console.log(error);
        })
    }
    const addComments = async () => {
        try {
            await axios.post(`http://localhost:4000/commentApi/comment`,{message, video: id,},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            alert('Comment added successfully');
            setMessage("");
            getCommentByVideoId();
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Something went wrong, please try again later');
        }
    };
    const getComments = async () => {
        try{
            await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
                setComments(response.data.comments);
            })
        } catch(error){
            console.log('comments not fetched');
        }
    }
    
    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:3000/commentApi/comment/${id}`).then((response) => {
            
            setComments(response.data.comments);
        }).catch(error => {
            console.log(error);
        })
    }
    const getRecommendVideo = async () => {
        try{
            const res = await axios.get('http://localhost:4000/api/allvideo');
            if (res.data.success && res.data.videos) {
              setVideos(res.data.videos);
            } else {
              throw new Error('Invalid response structure');
            }
        }
        catch (err) {
            console.error('Error fetching videos:', err);
          }
    }
    
    const isSubscribe = async () => {
        try {
            const userId = getTokenFromCookie();
            const response = await axios.get(
                `http://localhost:4000/auth/issubscribed/${id}`,
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

    const islike = async () => {
        try {
            const userId = getTokenFromCookie();
            const response = await axios.get(
                `http://localhost:4000/auth/isliked/${id}`,
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
            }
        } catch (error) {
            console.error('Liked error:', error.response?.data || error.message);
        }
    };

    const updateLike = async () => {
        try {
            await axios.patch(`http://localhost:4000/api/likes/${id}`);
        } catch (error) {
            console.error('Likes error:', error.response?.data || error.message);
        }
    }; 

    const addLike = async () => {
        try {
            await axios.patch(
                `http://localhost:4000/auth/like/${id}`,
                {}, 
                {  
                    withCredentials: true, 
                    headers: {
                      'Content-Type': 'application/json',
                    },
                }
            );
            window.location.reload();
        } catch (error) {
            console.error('Likes error:', error.response?.data || error.message);
        }
    };
    
    const saveLater = async () => {
        const userId = getTokenFromCookie();
        console.log("User ID:", userId, "Video ID:", id);
        try {
            const response = await axios.post(
                `http://localhost:4000/auth/savelater/${id}`,
                { userId },
                {  
                    withCredentials: true,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userId}`,
                    },
                }
            );
            console.log(response)
            alert('Video saved for watch later');
        } catch (error) {
            alert(error.response?.data?.error || "An error occurred");
        }
    };
    
    useEffect(() => {
        setData(null);
        setUser(null);
        setVideoUrl('');
        setComments([]);
        
        fetchVideoById();
        getCommentByVideoId();
        getRecommendVideo();
        getComments();
        addToHistory(id);
    }, [id]);

    useEffect(() => {
        islike();
        isSubscribe();
    }, [id]);
    

  return (
    <div className='video'>
      <div className='videoPostSection'>
        <div className='video_youtube'>
            {data && <video width="400" controls autoPlay className='video_youtube_video'>
                <source src={videoUrl} type='video/mp4'/>
                <source src={videoUrl} type='video/webm'/>
                your Browser does not support the video tag
            </video>}
        </div>
        
        <div className='video_youtubeAbout'>
            <div className='video_utubeTitle'>{data?.title}</div>
            <div className='youtube_video_ProfileBlock'>
                <div className='youtube_video_ProfileBlock_left'>
                    <Link to={`/user/${user?._id}`} className='youtube_video_ProfileBlock_left_img'>
                        <img className='youtube_video_ProfileBlock_left_image' src={user?.profilePic} alt='....'/>
                    </Link>
                    <div className='youtubeVideo_subsView'>
                        <div className='youtubePostProfileName'>{user?.userName}</div>
                        <div className='youtubePostProfileSubs'>{user?.createdAt.slice(0,10)}</div>
                    </div>
                    <div disabled={isSubscribed} className={isSubscribed ? 'subscribedBtnYoutube1' : 'subscribeBtnYoutube1'} onClick={() => { addSubscriber(); addSubscribe();}}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</div>
                </div>
                <div className='youtube_video_event_block'>
                    <div className='youtube_video_likeBlock'>
                        <div className={isLiked ? 'youtube_video_likeBlock_liked' : 'youtube_video_likeBlock_like'} onClick={() => {addLike(); updateLike();}}>
                            {isLiked ? (
                              <ThumbUpIcon />
                            ) : (
                              <ThumbUpOffAltIcon/>
                            )}
                            <div className='youtube_video_likeBlock_No.like'>{data?.like}</div>
                        </div>
                        <div className='youtubeVideoDivider'></div>
                        <div className='youtube_video_likeBlock_like' >
                            <ThumbDownOffAltIcon/>
                        </div>
                    </div>
                    <div className='youtube_video_likeBlock' onClick={() => saveLater()}>
                        <div className='youtube_video_likeBlock_like'>
                            <WatchLaterIcon/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='youtube_video_about'>
                <div>{data?.createdAt.slice(0, 10)}</div>
                <div>{data?.description}</div>
            </div>
            <div className='youtubeCommentSection'>
                <div className='youtubeCommentSectionTitle'>Comments :</div>
                <div className='youtubeSelfComment'>
                    <img className='video_youtubeSelfCommentProfile' src='https://imgs.search.brave.com/s7h4GwPFE3nOh8I-uZHXR22kIbzwafCF_Bye8A6B0io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL0xpZmVz/dHlsZS0xMDMzNDU3/MjUwLmpwZw' alt='....'/>
                    <div className='addComment'>
                        <input type='text' value={message} onChange={(e)=>{setMessage(e.target.value)}} className='addCommentInput' placeholder='Add a Comment'/>
                        <div className='cancelSubmitCommetn'>
                            <div className='cancelComment'>Cancel</div>
                            <div className='cancelComment' onClick={() => addComments()}>Comment</div>
                        </div>
                    </div>
                </div>
                <div className='showcomments' onClick={handleToggleComments}>Comments <ArrowDropDownIcon/></div>
                {showComments && (
                  <div className='youtubeOtherComment1'>
                  {
                      comments.map((item, index) => {
                          return (
                              <div className='youtubeSelfComment'>
                                  <img className='video_youtubeSelfCommetnProfile' src={item.user} alt='loading...'/>
                                  <p>{item.message}</p>
                              </div>
                          );
                      })
                  }
                  </div>
                )}

                { <div className='youtubeOtherComment'>
                    {
                        comments.map((item, index) => {
                            return (
                                <div className='youtubeSelfComment'>
                                    <img className='video_youtubeSelfCommetnProfile' src={item.user} alt='loading...'/>
                                    <p>{item.message}</p>
                                </div>
                            );
                        })
                    }
                </div> }
            </div>
        </div>
      </div>
      <div className='videoSuggestions'>
      {Videos.length > 0 ? (
          Videos.map((video) => (
            <div className='videoSuggestionsBlock' onClick={() => navigate(`/watch/${video._id}`)}>
                <div className='video_suggestion_thumbnail'>
                    <img className='video_suggestion_thumbnail_img' src={video.thumbnail} alt='thumbnail..'/>
                </div>
                <div className='video_suggestion_block'>
                    <div className='video_suggestion_about_title'>{video.title}</div>
                    <div className='video_suggestion_about_profile'>Cricket T20</div>
                    <div className='video_suggestion_about_profile'>136k views, {video.createdAt}</div>
                </div>
            </div>
            ))
            ) : (
              <div>No videos available</div>
            )}
      </div>
    </div>
  )
}

export default Video;
