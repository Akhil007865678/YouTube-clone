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
import './home.css';
import BottomNavbar from '../../components/BottumNav/BottumNavbar';

const Home = ({ sideNavbar }) => {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Redirect after 10 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://you-tube-clone-kappa-two.vercel.app';
    }, 10000); // 10000ms = 10 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div className='home'>
      {redirecting && (
        <div className="redirect-message">
          <h2>Server is starting...</h2>
          <p>Redirecting to live frontend in 10 seconds.</p>
        </div>
      )}
      
      {/* Optional: You can still render the normal home page behind the message */}
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
      <BottomNavbar />
    </div>
  );
};

export default Home;
