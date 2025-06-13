import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DiaryList.css';

interface Diary {
    id: number;
    title: string;
    country: string;
    city?: string;
    travelDate: string;
    expense: number;
    content1?: string;
    content2?: string;
    content3?: string;
    photo1Url?: string;
    photo2Url?: string;
    photo3Url?: string;
    nickname: string;
    createdTime: string;
}

const DiaryList: React.FC = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        fetchDiaries();
    }, [isLoggedIn, navigate]);

    const fetchDiaries = async () => {
        try {
            setLoading(true);
            // 전체 다이어리 또는 내 다이어리만 가져오기
            const response = await axios.get('http://localhost:8090/api/diaries');
            setDiaries(response.data);
        } catch (error) {
            console.error('다이어리 조회 실패:', error);
            setError('다이어리를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (diaryId: number) => {
        navigate(`/diaries/${diaryId}`);
    };

    const handleCreateNew = () => {
        navigate('/diary/create');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getFirstPhoto = (diary: Diary) => {
        return diary.photo1Url || diary.photo2Url || diary.photo3Url || null;
    };

    const getPreviewContent = (diary: Diary)=> {
        const contents = [diary.content1, diary.content2, diary.content3]
            .filter((content): content is string => Boolean(content && content.trim() !== ''));
        return contents.length > 0 ? contents[0] : '내용이 없습니다.';
    };

    if (loading) {
        return (
            <div className="diary-list-container">
                <div className="loading">로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="diary-list-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="diary-list-container">
            <div className="diary-list-header">
                <h1>내 여행 다이어리</h1>
                <button className="create-btn" onClick={handleCreateNew}>
                    새 다이어리 작성
                </button>
            </div>

            {diaries.length === 0 ? (
                <div className="empty-state">
                    <p>아직 작성한 다이어리가 없습니다.</p>
                    <button className="create-btn" onClick={handleCreateNew}>
                        첫 번째 다이어리 작성하기
                    </button>
                </div>
            ) : (
                <div className="diary-grid">
                    {diaries.map(diary => (
                        <div 
                            key={diary.id} 
                            className="diary-card"
                            onClick={() => handleCardClick(diary.id)}
                        >
                            <div className="card-image">
                                {getFirstPhoto(diary) ? (
                                    <img 
                                        src={`http://localhost:8090/${getFirstPhoto(diary)}`}
                                        alt={diary.title || '다이어리 이미지'}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const nextElement = target.nextElementSibling as HTMLElement;
                                            if (nextElement) {
                                                nextElement.style.display = 'flex';
                                            }
                                        }}
                                    />
                                ) : null}
                                <div className="no-image" style={{ display: getFirstPhoto(diary) ? 'none' : 'flex' }}>
                                    <span>📸</span>
                                </div>
                                <div className="card-country">{diary.country}</div>
                            </div>
                            
                            <div className="card-content">
                                <h3 className="card-title">{diary.title || '제목 없음'}</h3>
                                <p className="card-date">{formatDate(diary.travelDate)}</p>
                                <p className="card-preview">
                                    {getPreviewContent(diary).length > 50 
                                        ? getPreviewContent(diary).substring(0, 50) + '...'
                                        : getPreviewContent(diary)
                                    }
                                </p>
                                <div className="card-footer">
                                    <span className="card-expense">₩{diary.expense?.toLocaleString()}</span>
                                    <span className="card-author">{diary.nickname}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiaryList;