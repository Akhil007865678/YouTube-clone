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
import React from 'react';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import HomePage from '../../components/HomePage/homePage';
import './home .css';
import BottomNavbar from '../../components/BottumNav/BottumNavbar';

const Home = ({ sideNavbar }) => {
  return (
    <div className='home'>
      {/* Friendly message for recruiters */}
      <div className="landing-message">
        <h2>Welcome to YouTube Clone</h2>
        <p>Our live frontend is deployed on Vercel. Click the link below to visit it:</p>
        <a href="https://you-tube-clone-kappa-two.vercel.app" target="_blank" rel="noopener noreferrer">
          Go to Live Frontend
        </a>
      </div>

      {/* Normal homepage components */}
      <SideNavbar sideNavbar={sideNavbar}/>
      <HomePage sideNavbar={sideNavbar}/>
      <BottomNavbar />
    </div>
  );
};

export default Home;
