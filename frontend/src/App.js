import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/home';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Video from './Pages/Video/video';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import HistoryPage from './Pages/History/history';
import SearchResult from './Pages/Search/Search';
import Uservideo from './Pages/UserVideo/Uservideo';
import Videos from './Pages/LikeVideos/videos';
import SearchBar from './components/Voice/SearchBar';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const setSideNavbarFun = (value) => {
    setSideNavbar(value);
  }
  return (
    <BrowserRouter>
    <Navbar setSideNavbarFun={setSideNavbarFun} sideNavbar={sideNavbar}/>
    <Routes>
      <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
      <Route path='/watch/:id' element={<Video/>}/>
      <Route path='user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
      <Route path=':id/upload' element={<VideoUpload/>}/>
      <Route path='signup' element={<SignUp/>} />
      <Route path='history' element={<HistoryPage sideNavbar={sideNavbar}/>}/>
      <Route path='search/:id' element={<SearchResult sideNavbar={sideNavbar}/>}/>
      <Route path='uservideo' element={<Uservideo sideNavbar={sideNavbar}/>}/>
      <Route path='likevideo' element={<Videos sideNavbar={sideNavbar}/>}/>
      <Route path='audio' element={<SearchBar sideNavbar={sideNavbar}/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
