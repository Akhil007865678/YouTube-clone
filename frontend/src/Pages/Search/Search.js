import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import Search from '../../components/SearchResult/search';

const SearchResult = ({sideNavbar}) => {
  return (
    <div className='home'>
      <SideNavbar sideNavbar={sideNavbar}/>
      <Search sideNavbar={sideNavbar}/>
    </div>
  )
}

export default SearchResult;