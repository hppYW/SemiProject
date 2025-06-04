import './Login.css'
import logo from '../assets/Logo.svg'
import air1 from '../assets/Airplane.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
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
                <form className='login-form'>
                     <div className='input-box-login'>
                        <i><FontAwesomeIcon icon={faUser}/></i>
                        <input type='text' placeholder='아이디' className='input-id'></input>
                     </div>
                     <div className='input-box-login'>
                        <i><FontAwesomeIcon icon={faLock}/></i>
                        <input type='password' placeholder='비밀번호' className='input-pwd'></input>
                     </div>
                     <div className='forgot-pwd'>
                        <a href='#'>비밀번호를 잊으셨나요?</a>
                     </div>
                     <button className='login-btn'>
                        로그인
                     </button>
                     <p className='login-to-signup'>
                        계정이 없으시다면?    
                        <a href='#'>회원가입</a>
                     </p>
                </form>
            </div>
        </div>
    )
}

export default Login