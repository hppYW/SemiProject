import earth from '../assets/Group.svg'
import people from '../assets/people.svg'
import pin from '../assets/pin.svg'
import car from '../assets/Car.svg'
import './Body.css'

const Body: React.FC = () => {
    return(
        <div className='Body'>
            <div className="earth-container">
                <img 
                    src={earth} 
                    alt="Earth"
                    className="earth-svg"
                />
            </div>
            <img
                    src={pin}
                    alt='pin'
                    className='pin-svg'
                />
            <div className='right-container'>
                <h1 className='ment1'>여행지를 찾고 있나요?</h1>
                <img
                    src={people}
                    alt='people'
                    className='people-svg'
                />
                <h2 className='ment2'>랜덤으로 여행지를 추천해드립니다!</h2>
                <div className='btn-container'>
                    <img
                        src={car}
                        alt='car'
                        className='car-svg'
                    />
                    <button className='find-btn'>여행지 찾기</button>
                    <p className='signup-text'>
                        <a href='#'>회원가입</a>을 하면 더 많은 기능을 즐기실 수 있습니다.
                    </p>
                </div>
            </div>
        </div>       
    )
}

export default Body