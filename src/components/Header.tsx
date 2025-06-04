import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className="header-container">
        {/* 로고 */}
        <div className="logo">
            <div className="logo-icon">
                    <div className='logo-circle-blue1'></div>
                    <div className="logo-circle-black"></div>
                    <div className="logo-circle-blue2"></div>
            </div>
            <span className="logo-text">TravelDart</span>
        </div>
        
        {/* 검색바 */}
        <div className="search-container">
            <input 
                type="text" 
                placeholder="여행지 검색(나라/도시)"
                className="search-input"
            />
            <button className="search-btn">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
        
        {/* 네비게이션 메뉴 */}
        <nav className="nav-menu">
            <div className='item-menu'>
                <a className="nav-item">여행일기</a>
                <a href="#" className="nav-item">여행계획</a>
            </div>
            <div className='log-menu'>
                <Link to={'/Login'} className="login">로그인</Link>
                <Link to={'/Signup'} className="signup">회원가입</Link>
            </div>
            
        </nav>

        {/* 우측 장식 */}
        <div className="header-decoration">
            <div className="decoration-black"></div>
            <div className="decoration-blue"></div> 
        </div>
      </div>
    </header>
  );
};

export default Header