import React from 'react';
import History from '../../components/History/HistoryPage';
import SideNavbar from '../../components/SideNavbar/sideNavbar';


function HistoryPage({sideNavbar}) {
  return (
    <div>
      <SideNavbar sideNavbar={sideNavbar}/>
      <History sideNavbar={sideNavbar}/>
    </div>
  )
}

export default HistoryPage;