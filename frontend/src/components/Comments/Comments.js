import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './Commentss.css';

const CommentShorts = ({ setBox, videoId }) => {
  const boxRef = useRef();
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const handleToggleComments = () => {
    setShowComments(prev => !prev);
  };

  const addComments = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/commentApi/comment`,
        { message, video: videoId },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      alert('Comment added successfully');
      setMessage("");
      getCommentByVideoId();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/commentApi/comment/${videoId}`);
      setComments(response.data.comments || []);
      console.log("comment: ", response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (videoId) getCommentByVideoId();
  }, [videoId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setBox(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setBox]);

  return (
    <div className="comment1">
      <div className="comment1_card" ref={boxRef}>
        <div className="youtubeCommentSection">
          <div className="youtubeCommentSectionTitle1">Comments :</div>

          <div className="youtubeSelfComment1">
            <img className="video_youtubeSelfCommentProfile" src="https://example.com/avatar.jpg" alt="avatar" />
            <div className="addComment">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="addCommentInput"
                placeholder="Add a Comment"
              />
              <div className="cancelSubmitCommetn">
                <div className="cancelComment1" onClick={() => setMessage("")}>Cancel</div>
                <div className="cancelComment1" onClick={addComments}>Comment</div>
              </div>
            </div>
          </div>

          {showComments && (
            <div className="youtubeOtherComment2">
              {comments.length > 0 ? (
                comments.map((item, index) => (
                  <div key={index} className="youtubeSelfComment">
                    <img
                      className="video_youtubeSelfCommetnProfile"
                      src={item.user?.profilePic || 'https://example.com/default.jpg'}
                      alt="user"
                    />
                    <div>
                      <div><strong>{item.user?.userName}</strong></div>
                      <p>{item.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentShorts;
