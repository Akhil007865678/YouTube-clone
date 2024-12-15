import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Listening = ({setListenModel, transcript, sentences}) => {
  const navigate = useNavigate();

  navigate(`/search/${sentences}`);
  
  return (
    <div className='login'>
      <div className='login_card'>
      
      <div style={{ color: "black",marginTop: '30px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '60%', margin: '20px auto', background: '#e8f4fa', }}>
        <h3>Listening....</h3>
        <p>{transcript}</p>
      </div>
      </div>
    </div>
  );
};

export default Listening;
