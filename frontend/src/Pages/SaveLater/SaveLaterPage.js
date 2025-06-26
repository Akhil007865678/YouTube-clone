import React from 'react';
import SaveLater from '../../components/SaveLater/SaveLater';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import './Save.css';

function SaveLaterPage({sideNavbar}) {
  return (
    <div>
      <SideNavbar className="side-navbar" sideNavbar={sideNavbar}/>
      <SaveLater sideNavbar={sideNavbar}/>
    </div>
  )
}

export default SaveLaterPage;