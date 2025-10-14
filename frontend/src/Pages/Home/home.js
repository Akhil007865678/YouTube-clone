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
