import React, {useState, useEffect} from 'react';
import Menu from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import Login from '../Login/login';
import './navbar.css';
import { jwtDecode } from 'jwt-decode';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Listening from '../Listening/Listening';
//import sideNavbar from '../SideNavbar/sideNavbar';
import axios from 'axios';

const Navbar = ({setSideNavbarFun, sideNavbar}) => {
  const [userId, setuserId] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userPic, setUserPic] = useState("https://www.istockphoto.com/photos/unknown-user");
  const [navbarModal, setNavbarModal] = useState(false);
  const [navbarModal1, setNavbarModal1] = useState(false);
  const [login, setLogin] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [listeningDuration, setListeningDuration] = useState(6);
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setSideNavbarFun(false);
        }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/fetchUserData`, { withCredentials: true });
        setUser(response.data);
        console.log(user.data)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
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
  const handleClickModal = () => {
    setNavbarModal(prev => !prev);
  }
  const handleClickModal1 = () => {
    setNavbarModal1(prev => !prev);
  }
  const sideNavbarFun = () => {
      setSideNavbarFun(!sideNavbar);
  } 
  const uploadVideo = () => {
    navigate('/23/upload');
  }
  const uploadShort = () => {
    navigate('/uplaodshorts');
  }
  const onClickofPopUpOption = (button) => {
    setNavbarModal(false);
    if(button === "login"){
      setLogin(true);
    } else{

    }
  }
  const handleClickModal2 = (value) => {
    setNavbarModal1(false);
    if(value === "shorts"){
      navigate('/shorts');
    } else if(value === "History"){
      navigate('/history');
    } else if(value === "uservideo"){
      navigate('/uservideo');
    } else if(value === "Liked videos"){
      navigate('/likevideo');
    } else if(value === "save-later"){
      navigate('/save-later');
    } else if(value === 'Upload Video'){
      navigate('/23/upload');
    } else if(value === 'Upload Shorts'){
      navigate('/uplaodshorts');
    }
  }
  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };
  const setLoginModal=() => {
    setLogin(false);
  } 
  const navigateToProfile = () => {
    navigate(`/user/${userId}`);
  };
  const setListenModel = () => {
    //setListen(false);
  }
  const onClickofPopUp = (button) => {
    setNavbarModal(false);
    startListening();
    if(button === "login"){
      setLogin(true);
    } else{
      handleLogout();
    }
  }
  const handleLogout = async () => {
    setNavbarModal(false);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("token");
      setUser(null);
      setuserId(null);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  useEffect(() => {
    console.log("Transcript Updated:", transcript);
    if (transcript) {
      const cleanTranscript = transcript.trim().replace(/[.!?]$/, "");
      setSentences((prevSentences) => [...prevSentences, cleanTranscript]);
    }
  }, [transcript]);
  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      console.log("Started listening...");
      setTimeout(() => {
        stopListening();
      }, listeningDuration * 1000);
    } else {
      console.log("Browser does not support speech recognition.");
    }
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
    console.log("Stopped listening...");
  };
  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Browser Not Supported</h2>
        <p>Your browser does not support speech recognition. Please try a different browser.</p>
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <div className='navbarHamberger1' onClick={handleClickModal1}>
            <ExploreIcon sx={{color: "white"}}/>
        </div>
        <div className='navbarHamberger' onClick={sideNavbarFun}>
            <Menu sx={{color: "white"}}/>
        </div>
        <div className='navbar_youtubeImg' onClick={() => navigate('/')}>
          <YouTubeIcon sx={{fontSize: "34px"}} className='navbar_youtubeImage'/>
          <div className='navbar_utubeTitle'>YouTube</div>
        </div>
      </div>
      <div className='navbar-middle'>
        <div className='navbar-searchBox'>
          <form onSubmit={onSearch} className='navbar_searchBox-form'>
            <input type='text' placeholder='Search' className='navbar_searchBoxInput' onChange={(e) => setQuery(e.target.value)}/>
          </form>
          <div className='navbar_searchIconBox'><SearchIcon sx={{fontSize: "28px", color: "white"}}/></div>
        </div>
        <div className='navbar_mike' onClick={() => onClickofPopUp("listening")}>
            <KeyboardVoiceIcon sx={{color: "white"}}/>
        </div>
      </div>
      <div className='navbar-right'>
          {!isMobile && (
            <>
              <AddCircleTwoToneIcon onClick={uploadShort} sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
              <VideoCallIcon onClick={uploadVideo} sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
              <NotificationsActiveIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
            </>
          )}
          {user ? (
            <img 
              src={user.data.profilePic} 
              alt="Profile" 
              onClick={handleClickModal} 
              className="profile-img"
            />
          ) : (
            <AccountCircleIcon onClick={handleClickModal} sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
          )}
          { navbarModal &&
            <div className='navbar-modal'>
            <div className='navbar-modal-option' onClick={navigateToProfile}>Profile</div>
            <div className='navbar-modal-option' onClick={() => onClickofPopUpOption("login")}>Login</div>
            <div className='navbar-modal-option' onClick={() => handleLogout()}>Logout</div>
          </div>
          }
          { navbarModal1 &&
          <div className='navbar-modal1'>
            <div onClick={() => handleClickModal2('shorts')} className='navbar-modal-option'>Shorts</div>
            <div onClick={() => handleClickModal2('')} className='navbar-modal-option'>Subscriptions</div>
            <div onClick={() => handleClickModal2('History')} className='navbar-modal-option'>History</div>
            <div onClick={() => handleClickModal2('uservideo')} className='navbar-modal-option'>Your videos</div>
            <div onClick={() => handleClickModal2('Liked videos')} className='navbar-modal-option'>Liked videos</div>
            <div onClick={() => handleClickModal2('save-later')} className='navbar-modal-option'>watch later</div>
            <div onClick={() => handleClickModal2('Upload Video')} className='navbar-modal-option'>Upload Video</div>
            <div onClick={() => handleClickModal2('Upload Shorts')} className='navbar-modal-option'>Upload Shorts</div>
          </div>
          }
      </div>
      {
        login && <Login setLoginModal={setLoginModal}/>
      }
      {
        listening && <Listening setListenModel={setListenModel} transcript={transcript} sentences={sentences}/>
      }
    </div>
  )
}

export default Navbar;
