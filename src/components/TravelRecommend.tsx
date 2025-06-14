import React, { useState } from 'react';
import axios from 'axios';
import './TravelRecommend.css';

interface Attraction {
    name: string;
    description: string;
}

interface TravelData {
    country: string;
    city: string;
    attractions: Attraction[];
    summary: string;
}

interface TravelRecommendProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (travelData: TravelData) => void;
}

const TravelRecommend: React.FC<TravelRecommendProps> = ({
    isOpen,
    onClose,
    onSave
}) => {
    const [travelData, setTravelData] = useState<TravelData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getRecommendation = async () => {
        setLoading(true);
        setError('');
        setTravelData(null);

        try {
            const response = await axios.post('http://localhost:8090/api/travel/recommend');
            console.log('여행지 추천 응답:', response.data);

            if (response.data.status === 'success') {
                setTravelData(response.data.data);
            } else {
                setError(response.data.message || '여행지 추천을 가져올 수 없습니다.');
            }
        } catch (error) {
            console.error('여행지 추천 실패:', error);
            setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (travelData) {
            onSave(travelData);
            onClose();
        }
    };

    const handleClose = () => {
        setTravelData(null);
        setError('');
        onClose();
    };

    // 모달이 열렸을 때 자동으로 추천 실행
    React.useEffect(() => {
        if (isOpen && !travelData && !loading) {
            getRecommendation();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🌍 AI 여행지 추천</h2>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>

                <div className="modal-body">
                    {loading && (
                        <div className="loading-section">
                            <div className="spinner"></div>
                            <p>전세계에서 멋진 여행지를 찾고 있어요...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-section">
                            <p>❌ {error}</p>
                            <button onClick={getRecommendation} className="retry-btn">
                                다시 시도
                            </button>
                        </div>
                    )}

                    {travelData && (
                        <div className="recommendation-result">
                            <div className="destination-header">
                                <h3>🏛️ {travelData.country} - {travelData.city}</h3>
                                <p className="summary">{travelData.summary}</p>
                            </div>

                            <div className="attractions-section">
                                <h4>🎯 추천 관광지</h4>
                                <div className="attractions-list">
                                    {travelData.attractions.map((attraction, index) => (
                                        <div key={index} className="attraction-item">
                                            <h5>📍 {attraction.name}</h5>
                                            <p>{attraction.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {travelData && (
                        <>
                            <button onClick={getRecommendation} className="refresh-btn" disabled={loading}>
                                🔄 다른 여행지 추천
                            </button>
                            <button onClick={handleSave} className="save-btn">
                                💾 저장하기
                            </button>
                        </>
                    )}
                    <button onClick={handleClose} className="cancel-btn">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelRecommend;