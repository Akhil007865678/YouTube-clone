import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField, [name]: event.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', loginField);
      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', response.data.token);
        
        setLoginModal()
        document.cookie = `token=${token}; path=/`;
        navigate('/');
        window.location.reload();
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Oops something went wrong, Try again");
      console.log(err);
    }
  };

  return (
    <div className='login'>
      <div className='login_card'>
        <div className='titleCard_login'>
           <YouTubeIcon sx={{ fontSize: "54px", color: "red" }}/>
           Login
        </div>
        <div className='loginCredentials'>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' value={loginField.userName} onChange={(e) => handleOnChangeInput(e, "userName")} placeholder='UserName' type='text'/>
            </div>
            <div className='usernameLogin'>
                <input className='userNameLoginUserName' value={loginField.password} onChange={(e) => handleOnChangeInput(e, "password")} placeholder='Password' type='password'/>
            </div>
        </div>
        {error && <div className='error-message'>{error}</div>}
        <div className='login_buttons'>
            <div className='login-btn' onClick={handleLogin}> Login </div>
            <Link to={'/signup'} onClick={() => setLoginModal()} className='login-btn'> SignUp </Link>
            <div className='login-btn' onClick={() => setLoginModal()}> Cancel </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
