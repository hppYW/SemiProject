import './Signup.css'
import logo from '../assets/Logo.svg'
import air2 from '../assets/Airplane2.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        passwordConfirm:'',
        name: '',
        email: '',
        nickname: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });

        // 비밀번호 확인 실시간 체크
        if (name === 'passwordConfirm') {
            setPasswordMatch(formData.password === value);
        }
        if (name === 'password') {
            setPasswordMatch(value === formData.passwordConfirm);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 비밀번호 길이 체크
        if (formData.password.length < 6 || formData.password.length > 16) {
            alert('비밀번호는 6~16자로 입력해주세요.');
            return;
        }

        try {
        const response = await axios.post('http://localhost:8090/api/auth/signup', {
            userId: formData.userId,
            password: formData.password,  // Spring Boot에서 pwd로 받음
            name: formData.name,
            email: formData.email,
            nickname: formData.nickname
        });
        
        console.log('회원가입 성공:', response.data);
        alert('회원가입 성공!');
        
        // 폼 초기화
        setFormData({
            userId: '',
            password: '',
            passwordConfirm: '',
            name: '',
            email: '',
            nickname: ''
        });
      
        } catch (error: any) {
            console.error('전체 에러:', error);
            console.error('응답 상태:', error.response?.status);
            console.error('응답 데이터:', error.response?.data);
            console.error('에러 메시지:', error.message);
            
            // 더 구체적인 에러 메시지
            if (error.response?.data?.message) {
                alert(`회원가입 실패: ${error.response.data.message}`);
            } else if (error.response?.status === 400) {
                alert('잘못된 요청입니다. 입력 데이터를 확인해주세요.');
            } else if (error.response?.status === 500) {
                alert('서버 내부 오류입니다.');
            } else {
                alert(`회원가입 실패: ${error.message}`);
            }
        }}

    return(
        <div className='background-img'>
            <div className='signup-container'>
                <div className='signup-title'>
                    <img
                    src={logo}
                    alt='logo'
                    className= 'logo-img'
                    >
                    </img>
                    <h1 className='logo-name'>TravelDart</h1>
                </div>
                <img
                    src={air2}
                    alt='airplane'
                    className='airplane-img'
                >
                </img>
                <h1 className='signup-text-log'>Signup</h1>
                <form className='signup-form' onSubmit={handleSignup}>
                    <div className='input-box-signup'>
                        <input type='text' name='email' placeholder='이메일' className='input-email' value={formData.email}
                        onChange={handleChange} required></input>
                     </div>
                     <div className='input-box-signup'>
                        <input type='text' name='name' placeholder='이름' className='input-name' value={formData.name}
                        onChange={handleChange} required></input>
                     </div>
                     <div className='input-box-signup'>
                        <i><FontAwesomeIcon icon={faUser}/></i>
                        <input type='text' name='userId' placeholder='아이디' className='input-id' value={formData.userId}
                        onChange={handleChange} required></input>
                     </div>
                     <div className='input-box-signup'>
                        <i><FontAwesomeIcon icon={faLock}/></i>
                        <input type='password' name='password' placeholder='비밀번호' className='input-pwd' value={formData.password}
                        onChange={handleChange} required></input>
                     </div>
                     <p className='pwd-rule'>6~16자 영문 대소문자</p>
                     <div className='input-box-signup'>
                        <i><FontAwesomeIcon icon={faLock}/></i>
                        <input type='password' name='passwordConfirm' placeholder='비밀번호 확인' className={`input-pwd-check ${!passwordMatch ? 'error' : ''}`}
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            required></input>
                     </div>
                     {!passwordMatch && formData.passwordConfirm && (
                        <p className='error-message'>비밀번호가 일치하지 않습니다.</p>
                    )}
                     <div className='input-box-signup'>
                        <input type='text' name='nickname' placeholder='닉네임' className='input-nickname' value={formData.nickname}
                        onChange={handleChange} required></input>
                     </div>
                     <button className='signup-btn' type='submit'>
                        회원가입
                     </button>
                     <p className='signup-to-login'>
                        계정이 있있으시다면?    
                        <Link to={'/Login'} className="login-link">로그인</Link>
                     </p>
                </form>
            </div>
        </div>
    )
}

export default Signup