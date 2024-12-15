import React, {useState, useEffect} from 'react';
import Menu from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
//import PersonIcon from '@mui/icons-material/Person';
import Login from '../Login/login';
import './navbar.css';
import { jwtDecode } from 'jwt-decode';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Listening from '../Listening/Listening';
//import sideNavbar from '../SideNavbar/sideNavbar';

const Navbar = ({setSideNavbarFun, sideNavbar}) => {
  const [userId, setuserId] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userPic, setUserPic] = useState("https://www.istockphoto.com/photos/unknown-user");
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [listeningDuration, setListeningDuration] = useState(6);
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

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
  const sideNavbarFun = () => {
      setSideNavbarFun(!sideNavbar);
  } 
  const uploadVideo = () => {
    navigate('/23/upload');
  }
  const onClickofPopUpOption = (button) => {
    setNavbarModal(false);
    if(button === "login"){
      setLogin(true);
    } else{

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

    }
  }

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
          <VideoCallIcon onClick={uploadVideo} sx={{fontSize: "30px", cursor: "pointer", color: "white"}}/>
          <NotificationsActiveIcon sx={{fontSize: "30px", cursor: "pointer", color: "white"}}/>
          <img onClick={handleClickModal} src={userPic} className='navbar-right-logo' alt='Logo'/>

          { navbarModal &&
            <div className='navbar-modal'>
            <div className='navbar-modal-option' onClick={navigateToProfile}>Profile</div>
            <div className='navbar-modal-option' onClick={() => onClickofPopUpOption("login")}>Login</div>
            <div className='navbar-modal-option' onClick={() => onClickofPopUpOption("logout")}>Logout</div>
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
