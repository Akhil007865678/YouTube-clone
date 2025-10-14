/*import React from 'react'
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
*/
import React, { useEffect, useState } from 'react';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import HomePage from '../../components/HomePage/homePage';
import BottomNavbar from '../../components/BottumNav/BottumNavbar';
import './home .css';

const Home = ({ sideNavbar }) => {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const checkBackend = () => {
      fetch('https://youtube-clone-cuxp.onrender.com') // hit root or any lightweight endpoint
        .then((res) => {
          if (res.ok) setBackendReady(true);
        })
        .catch(() => setBackendReady(false));
    };

    // Initial check
    checkBackend();

    // Poll every 5 seconds until backend is ready
    const interval = setInterval(() => {
      checkBackend();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {!backendReady && (
        <div className="backend-message">
          <h2>Backend is waking up...</h2>
          <p>It may take a few seconds to start. Please wait.</p>
        </div>
      )}

      {/* Normal homepage components */}
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
      <BottomNavbar />
    </div>
  );
};

export default Home;
