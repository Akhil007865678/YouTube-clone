import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import HomePage from '../../components/HomePage/homePage';
import './home .css';
import BottomNavbar from '../../components/BottumNav/BottumNavbar';

const home = ({sideNavbar}) => {
  return (
    <div className='home'>
      <SideNavbar sideNavbar={sideNavbar}/>
      <HomePage sideNavbar={sideNavbar}/>
      <BottomNavbar />
    </div>
  )
}

export default home;

/*
import React, { useEffect, useState } from 'react';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import HomePage from '../../components/HomePage/homePage';
import BottomNavbar from '../../components/BottumNav/BottumNavbar';
import './home .css';

const Home = ({ sideNavbar }) => {
  const [backendReady, setBackendReady] = useState(false);
  const [showMessage, setShowMessage] = useState(true); // to handle cross button

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('https://youtube-clone-cuxp.onrender.com'); // lightweight endpoint
        if (res.ok) {
          setBackendReady(true); // backend is running
          setShowMessage(false); // hide message automatically
        } else {
          setBackendReady(false);
        }
      } catch {
        setBackendReady(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000); // poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {!backendReady && showMessage && (
        <div className="backend-message">
          <span className="close-btn" onClick={() => setShowMessage(false)}>×</span>
          <h2>Backend is waking up...</h2>
          <p>It may take a few seconds to start. Please wait.</p>
        </div>
      )}

      {/* Normal homepage */}
 //     <SideNavbar sideNavbar={sideNavbar} />
   //   <HomePage sideNavbar={sideNavbar} />
     // <BottomNavbar />
    //</div>
  //);
//};
*/
export default Home;
