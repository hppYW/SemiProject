import './Signup.css'
import logo from '../assets/Logo.svg'
import air2 from '../assets/Airplane2.svg'

const Signup: React.FC = () => {
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
                    src={air2}
                    alt='airplane'
                    className='airplane-img'
                >
                </img>
                <h1 className='login-text'>Signup</h1>
                <form className='login-form'>
                    <div className='input-box'>
                        <input type='text' placeholder='이메일' className='input-email'></input>
                     </div>
                     <div className='input-box'>
                        <input type='text' placeholder='이름' className='input-name'></input>
                     </div>
                     <div className='input-box'>
                        <i className='bx bxs-user'></i>
                        <input type='text' placeholder='아이디' className='input-id'></input>
                     </div>
                     <div className='input-box'>
                        <i className='bx bxs-lock-alt'></i>
                        <input type='password' placeholder='비밀번호' className='input-pwd'></input>
                     </div>
                     <p>6~8자 영문 대소문자</p>
                     <div className='input-box'>
                        <i className='bx bxs-lock-alt'></i>
                        <input type='password' placeholder='비밀번호 확인' className='input-pwd-check'></input>
                     </div>
                     <button className='signup-btn'>
                        회원가입입
                     </button>
                     <p className='login'>
                        계정이 있있으시다면?    
                        <a href='#'>회원가입</a>
                     </p>
                </form>
            </div>
        </div>
    )
}

export default Signup