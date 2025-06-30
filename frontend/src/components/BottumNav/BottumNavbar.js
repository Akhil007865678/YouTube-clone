import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './BottomNavbar.css';


const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-navbar">
      <div className="nav-icon" onClick={() => navigate('/shorts')}>
        <PlayCircleIcon />
      </div>
    </div>
  );
};

export default BottomNavbar;
