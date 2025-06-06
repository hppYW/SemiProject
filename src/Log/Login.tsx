import './Login.css'
import logo from '../assets/Logo.svg'
import air1 from '../assets/Airplane.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
        const response = await axios.post('http://localhost:8090/api/auth/login', {
            userId: userId,
            password: password
        });
        
        console.log('로그인 성공:', response.data);
        login(response.data.user);

        alert('로그인 성공!');
        navigate('/');

        } catch (error) {
        console.log('로그인 실패:', error);
        alert('로그인 실패!');
        }
    };
    return(
        <div className='background-img'>
            <div className='login-container'>
                <div className='login-title'>
                    <img
                    src={logo}
                    alt='logo'
                    className= 'logo-img'
                    >
                    </img>
                    <h1 className='logo-name'>TravelDart</h1>
                </div>
                <img
                    src={air1}
                    alt='airplane'
                    className='airplane-img'
                >
                </img>
                <h1 className='login-text'>Login</h1>
                <form className='login-form' onSubmit={handleLogin}>
                     <div className='input-box-login'>
                        <i><FontAwesomeIcon icon={faUser}/></i>
                        <input type='text' name='userId' placeholder='아이디' className='input-id' onChange={(e) => setUserId(e.target.value)}></input>
                     </div>
                     <div className='input-box-login'>
                        <i><FontAwesomeIcon icon={faLock}/></i>
                        <input type='password' name='password' placeholder='비밀번호' className='input-pwd' onChange={(e) => setPassword(e.target.value)}></input>
                     </div>
                     <div className='forgot-pwd'>
                        <a href='#'>비밀번호를 잊으셨나요?</a>
                     </div>
                     <button className='login-btn' type='submit'>
                        로그인
                     </button>
                     <p className='login-to-signup'>
                        계정이 없으시다면?    
                        <Link to={'/Signup'} className="signup-link">회원가입</Link>
                     </p>
                </form>
            </div>
        </div>
    )
}

export default Login