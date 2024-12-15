import React, { useState } from 'react';
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [channelName, setchannelName] = useState('');
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [profilePic, setprofilePic] = useState(null);
    const [about, setabout] = useState('');
    const [message, setMessage] = useState('');
    const [progressBar, setProgressBar] = useState(false);

    const handleImageChange = (e) => {
        setprofilePic(e.target.files[0]);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!profilePic) {
            setMessage('Please select a profile picture.');
            return;
        }

        const formData = new FormData();
        formData.append('channelName', channelName);
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('profilePic', profilePic);
        formData.append('about', about);

        try {
            setProgressBar(true);
            const response = await axios.post('http://localhost:4000/auth/signup', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setProgressBar(false);
            setMessage(response.data.message);
        } catch (error) {
            setProgressBar(false);
            setMessage(error.response?.data?.error || 'Error in SignUp');
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className='signup'>
            <div className='signup_card'>
                <div className='signUp_title'>
                    <YouTubeIcon sx={{ fontSize: '54px', color: 'red' }} />
                    SignUp
                </div>
                <form className='signUp_Inputs' action='/auth/signup' method="POST" encType='multipart/form-data'>
                    <input type='text' className='signUp_Inputs_inp' value={channelName} onChange={(e) => setchannelName(e.target.value)} placeholder='Channel Name' />
                    <input type='text' className='signUp_Inputs_inp' value={userName} onChange={(e) => setuserName(e.target.value)} placeholder='User Name' />
                    <input type='password' className='signUp_Inputs_inp' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
                    <input type='text' className='signUp_Inputs_inp' value={about} onChange={(e) => setabout(e.target.value)} placeholder='About Your Channel' />
                    <div className='image_upload_signup'>
                        <input type='file' onChange={handleImageChange} />
                        {profilePic && <img className='image_default_signup' src={URL.createObjectURL(profilePic)} alt='Profile Preview' />}
                    </div>
                    <div className='signUpBtns'>
                        <button className='signUpBtn' type='submit' onClick={handleSignUp}>SignUp</button>
                        <Link to={'/'} className='signUpBtn'>Home Page</Link>
                    </div>
                    {progressBar && <Box sx={{ width: '100%' }}><LinearProgress/></Box>}
                    {message && <p className='message'>{message}</p>}
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
