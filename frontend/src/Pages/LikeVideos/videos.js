import React from 'react';
import LikedVideo from '../../components/LikedVideo/likedVideo';
import SideNavbar from '../../components/SideNavbar/sideNavbar';

function videos({sideNavbar}) {
  return (
    <div>
      <SideNavbar sideNavbar={sideNavbar}/>
      <LikedVideo sideNavbar={sideNavbar}/>
    </div>
  )
}

export default videos;
