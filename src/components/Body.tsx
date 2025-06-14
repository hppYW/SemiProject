import React, { useState } from 'react';
import earth from '../assets/Group.svg'
import people from '../assets/people.svg'
import pin from '../assets/pin.svg'
import car from '../assets/Car.svg'
import TravelRecommend from './TravelRecommend';
import './Body.css'

interface TravelData {
    country: string;
    city: string;
    attractions: Array<{
        name: string;
        description: string;
    }>;
    summary: string;
}

const Body: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFindTravel = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveTravel = (travelData: TravelData) => {
        // 여행지 저장 로직
        console.log('여행지 저장됨:', travelData);
        
        // 실제로는 백엔드 API 호출하여 저장
        // saveTravelToDatabase(travelData);
        
        // 저장 완료 알림
        alert(`${travelData.country} ${travelData.city}가 저장되었습니다! 🎉`);
        
        // 저장된 여행지 페이지로 이동하거나 다른 액션 수행
        // navigate('/saved-travels');
    };


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
                    <button className='find-btn' onClick={handleFindTravel}>여행지 찾기</button>
                </div>
            </div>
            {/* 여행지 추천 모달 */}
            <TravelRecommend
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTravel}
            />
        </div>       
    )
}

export default Body