import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useState } from 'react';
import userimg from '../assets/Vector.svg'

const Header: React.FC = () => {
    const { user, logout, isLoggedIn } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        alert('로그아웃 되었습니다.');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

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
                <a href='/' className="logo-text">TravelDart</a>
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
                    <Link to="/alldiaries" className="nav-item">여행일기</Link>
                    <a href="#" className="nav-item">여행계획</a>
                </div>
                {/* 로그인 상태에 따라 다른 메뉴 표시 */}
                {isLoggedIn ? (
                <div className='log-menu'>
                    <div className="user-profile-container">
                        <button 
                            type="button" 
                            className="user-btn"
                            onClick={toggleDropdown}
                        >
                            <img 
                                src={userimg}
                                alt="사용자 프로필"
                                className="user-img" 
                            />
                        </button>
                        
                        {/* 드롭다운 메뉴 */}
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item">
                                    <span className="user-name">{user?.nickname}님</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className='my-diary'>
                                    <Link to="/diaries" className='my-diaries'>내 다이어리</Link>
                                </div>
                                <button 
                                    className="dropdown-item logout-item"
                                    onClick={handleLogout}
                                >
                                    로그아웃 ↗
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='log-menu'>
                    <Link to="/Login" className="login">로그인</Link>
                    <Link to="/Signup" className="signup">회원가입</Link>
                </div>
            )}
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