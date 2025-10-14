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
import './home.css';

const Home = ({ sideNavbar }) => {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    // Function to check if backend is responding
    const checkBackend = async () => {
      try {
        const res = await fetch('https://youtube-clone-cuxp.onrender.com'); // can be root or /api/health
        if (res.ok) {
          setBackendReady(true); // Backend is running, remove message
        } else {
          setBackendReady(false); // Backend not ready yet
        }
      } catch (err) {
        setBackendReady(false); // Backend still sleeping
      }
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
      {/* Show message only when backend is not ready */}
      {!backendReady && (
        <div className="backend-message">
          <h2>Backend is waking up...</h2>
          <p>It may take a few seconds to start. Please wait.</p>
        </div>
      )}

      {/* Normal homepage */}
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
      <BottomNavbar />
    </div>
  );
};

export default Home;
export default Home;
