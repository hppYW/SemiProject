import './Signup.css'
import logo from '../assets/Logo.svg'
import air2 from '../assets/Airplane2.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup: React.FC = () => {
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
                <h1 className='signup-text'>Signup</h1>
                <form className='signup-form'>
                    <div className='input-box-signup'>
                        <input type='text' placeholder='이메일' className='input-email'></input>
                     </div>
                     <div className='input-box-signup'>
                        <input type='text' placeholder='이름' className='input-name'></input>
                     </div>
                     <div className='input-box-signup'>
                        <i><FontAwesomeIcon icon={faUser}/></i>
                        <input type='text' placeholder='아이디' className='input-id'></input>
                     </div>
                     <div className='input-box-signup'>
                        <i><FontAwesomeIcon icon={faLock}/></i>
                        <input type='password' placeholder='비밀번호' className='input-pwd'></input>
                     </div>
                     <p className='pwd-rule'>6~8자 영문 대소문자</p>
                     <div className='input-box-signup'>
                        <i><FontAwesomeIcon icon={faLock}/></i>
                        <input type='password' placeholder='비밀번호 확인' className='input-pwd-check'></input>
                     </div>
                     <button className='signup-btn'>
                        회원가입
                     </button>
                     <p className='signup-to-login'>
                        계정이 있있으시다면?    
                        <a href='#'>회원가입</a>
                     </p>
                </form>
            </div>
        </div>
    )
}

export default Signup