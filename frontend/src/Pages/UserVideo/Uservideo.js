import React from 'react'
import UserVideo from '../../components/UserVideo/video';
import SideNavbar from '../../components/SideNavbar/sideNavbar';

function Uservideo({sideNavbar}) {
  return (
    <div>
      <SideNavbar sideNavbar={sideNavbar}/>
      <UserVideo sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Uservideo;
