import './Login.css'
import logo from '../assets/Logo.svg'
import air1 from '../assets/Airplane.svg'

const Login: React.FC = () => {
    return(
        <div className='background-img'>
            <div className='login-container'>
                <img
                    src={logo}
                    alt='logo'
                    className= 'logo-img'
                >
                </img>
                <h1 className='logo-name'>TravelDart</h1>
                <img
                    src={air1}
                    alt='airplane'
                    className='airplane-img'
                >
                </img>
                <h1 className='login-text'>Login</h1>
                <form className='login-form'>
                     <div className='input-box'>
                        <i className='bx bxs-user'></i>
                        <input type='text' placeholder='아이디' className='input-id'></input>
                     </div>
                     <div className='input-box'>
                        <i className='bx bxs-lock-alt'></i>
                        <input type='password' placeholder='비밀번호' className='input-pwd'></input>
                     </div>
                     <div className='forgot-pwd'>
                        <a href='#'>비밀번호를 잊으셨나요?</a>
                     </div>
                     <button className='login-btn'>
                        로그인
                     </button>
                     <p className='register'>
                        계정이 없으시다면?    
                        <a href='#'>회원가입</a>
                     </p>
                </form>
            </div>
        </div>
    )
}

export default Login