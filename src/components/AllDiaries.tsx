import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllDiaries.css';

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

const AllDiaries: React.FC = () => {
    const navigate = useNavigate();
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'expensive' | 'cheap'>('latest');

    useEffect(() => {
        fetchAllDiaries();
    }, []);

    const fetchAllDiaries = async () => {
        try {
            setLoading(true);
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

    const getPreviewContent = (diary: Diary) => {
        const contents = [diary.content1, diary.content2, diary.content3]
            .filter((content): content is string => Boolean(content && content.trim() !== ''));
        return contents.length > 0 ? contents[0] : '내용이 없습니다.';
    };

    // 필터링 및 정렬
    const getFilteredAndSortedDiaries = () => {
        let filtered = diaries;

        // 국가별 필터링
        if (filterCountry) {
            filtered = filtered.filter(diary => 
                diary.country.toLowerCase().includes(filterCountry.toLowerCase())
            );
        }

        // 정렬
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'latest':
                    return new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime();
                case 'oldest':
                    return new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime();
                case 'expensive':
                    return (b.expense || 0) - (a.expense || 0);
                case 'cheap':
                    return (a.expense || 0) - (b.expense || 0);
                default:
                    return 0;
            }
        });
    };

    // 인기 국가 목록 (상위 5개)
    const getPopularCountries = () => {
        const countryCount = diaries.reduce((acc, diary) => {
            acc[diary.country] = (acc[diary.country] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(countryCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([country]) => country);
    };

    if (loading) {
        return (
            <div className="all-diaries-container">
                <div className="loading">로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="all-diaries-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    const filteredDiaries = getFilteredAndSortedDiaries();
    const popularCountries = getPopularCountries();

    return (
        <div className="all-diaries-container">
            <div className="all-diaries-header">
                <div className="header-content">
                    <h1>모든 여행 다이어리</h1>
                    <p>전 세계 여행자들의 소중한 여행 기록을 둘러보세요</p>
                    <button className="create-btn" onClick={handleCreateNew}>
                        나도 다이어리 작성하기
                    </button>
                </div>
            </div>

            <div className="filters-section">
                <div className="filters-container">
                    <div className="filter-group">
                        <label>국가 검색:</label>
                        <input
                            type="text"
                            placeholder="국가명을 입력하세요"
                            value={filterCountry}
                            onChange={(e) => setFilterCountry(e.target.value)}
                            className="country-filter"
                        />
                    </div>

                    <div className="filter-group">
                        <label>정렬:</label>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="sort-select"
                        >
                            <option value="latest">최신순</option>
                            <option value="oldest">오래된순</option>
                            <option value="expensive">비용 높은순</option>
                            <option value="cheap">비용 낮은순</option>
                        </select>
                    </div>

                    <div className="popular-countries">
                        <label>인기 국가:</label>
                        <div className="country-tags">
                            <button 
                                className={`country-tag ${filterCountry === '' ? 'active' : ''}`}
                                onClick={() => setFilterCountry('')}
                            >
                                전체
                            </button>
                            {popularCountries.map(country => (
                                <button
                                    key={country}
                                    className={`country-tag ${filterCountry === country ? 'active' : ''}`}
                                    onClick={() => setFilterCountry(country)}
                                >
                                    {country}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="results-info">
                <span>{filteredDiaries.length}개의 여행 다이어리</span>
            </div>

            {filteredDiaries.length === 0 ? (
                <div className="empty-state">
                    <p>검색 조건에 맞는 다이어리가 없습니다.</p>
                    <button className="create-btn" onClick={handleCreateNew}>
                        첫 번째 다이어리 작성하기
                    </button>
                </div>
            ) : (
                <div className="diary-grid">
                    {filteredDiaries.map(diary => (
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
                                    <span className="card-expense">₩{diary.expense?.toLocaleString() || '0'}</span>
                                    <span className="card-author">by {diary.nickname || '익명'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllDiaries;