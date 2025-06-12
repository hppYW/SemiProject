import React, { useState } from 'react';
import axios from 'axios';
import diaryimg from '../assets/notebook.svg'
import underimg from '../assets/post-img.svg'
import photo from '../assets/Group2.svg'
import './TravelDiary.css';

const TravelDiary: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [expense, setExpense] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState(['', '', '']); // 3개의 텍스트 영역
    const [photos, setPhotos] = useState<File[]>([]); // 업로드된 사진들

    // 달력 관련 함수들
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const isDateSelected = (day: number) => {
        if (!selectedDate) return false;
        return selectedDate.getDate() === day &&
               selectedDate.getMonth() === currentMonth.getMonth() &&
               selectedDate.getFullYear() === currentMonth.getFullYear();
    };

    // 컨텐츠 텍스트 변경 핸들러
    const handleContentChange = (index: number, value: string) => {
        const newContents = [...contents];
        newContents[index] = value;
        setContents(newContents);
    };

    // 사진 업로드 핸들러
    const handlePhotoUpload = (index: number, file: File | null) => {
        const newPhotos = [...photos];
        if (file) {
            newPhotos[index] = file;
        }
        setPhotos(newPhotos);
    };

    // 여행 다이어리 저장 함수
    const handleSaveDiary = async () => {
        if (!selectedCountry || !selectedDate || !expense) {
            alert('모든 필수 정보를 입력해주세요.');
            return;
        }

        try {
            const formData = new FormData();
            
            // DB 필드명에 맞춰서 데이터 추가
            formData.append('title', title); // title 필드 - 제목만
            formData.append('country', selectedCountry); // country 필드
            formData.append('expense', expense); // expense 필드
            formData.append('travel_date', selectedDate.toISOString().split('T')[0]); // travel_date 필드 (YYYY-MM-DD)
            formData.append('user_id', '1'); // user_id - 실제로는 로그인된 사용자 ID
            formData.append('nickname', 'testUser'); // nickname - 실제로는 로그인된 사용자 닉네임
            
            // 3개 텍스트 내용을 각각 따로 전송
            formData.append('content1', contents[0] || ''); // 첫 번째 텍스트
            formData.append('content2', contents[1] || ''); // 두 번째 텍스트  
            formData.append('content3', contents[2] || ''); // 세 번째 텍스트

            // 사진 파일들 추가 (photo1, photo2, photo3)
            photos.forEach((photo, index) => {
                if (photo) {
                    formData.append(`photo${index + 1}`, photo); // photo1, photo2, photo3으로 전송
                }
            });

            const response = await axios.post('http://localhost:8090/api/diary/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('다이어리 저장 성공:', response.data);
            alert('여행 다이어리가 저장되었습니다!');

            // 폼 초기화
            setSelectedCountry('');
            setSelectedDate(null);
            setExpense('');
            setTitle('');
            setContents(['', '', '']);
            setPhotos([]);

        } catch (error: any) {
            console.error('다이어리 저장 실패:', error);
            
            if (error.response?.data?.message) {
                alert(`저장 실패: ${error.response.data.message}`);
            } else if (error.response?.status === 400) {
                alert('잘못된 요청입니다. 입력 데이터를 확인해주세요.');
            } else if (error.response?.status === 500) {
                alert('서버 내부 오류입니다.');
            } else {
                alert(`저장 실패: ${error.message}`);
            }
        }
    };


    return (
        <div className='travel-diary-body'>
            <div className="travel-diary-container">
                {/* 왼쪽 섹션 */}
                <div className="left-section">
                    <h1 className="diary-title">Travel<br />Diary</h1>
                    <div className="notebook-illustration">
                        <img
                            src={diaryimg}
                            alt='diaryimg'
                            className='note-img'
                        />
                    </div>
                </div>
                {/* 링바인더 */}
                <div className="ring-binder">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="ring"></div>
                    ))}
                </div>

                {/* 중앙 섹션 */}
                <div className="center-section">
                    {/* 왼쪽 제목 영역 */}
                    <div className="title-area">
                        <textarea 
                            placeholder="Title"
                            className="title-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={10}
                        />
                    </div>
                    
                    {/* 메인 콘텐츠 그리드 */}
                    <div className="photo-grid">
                        {/* 1행: 사진 + 텍스트 */}
                        <div className="photo-upload-box">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(0, e.target.files?.[0] || null)}
                                style={{ display: 'none' }}
                                id="photo-upload-0"
                            />
                            <label htmlFor="photo-upload-0" className="photo-label">
                                <img src={photo} alt='photo' className='photo-input' />
                            </label>
                        </div>
                        <div className="text-upload-box">
                            <textarea 
                                placeholder="내용을 입력하세요"
                                className="content-textarea"
                                value={contents[0]}
                                onChange={(e) => handleContentChange(0, e.target.value)}
                                rows={4}
                            />
                        </div>
                        
                        {/* 2행: 텍스트 + 사진 */}
                        <div className="text-upload-box">
                            <textarea 
                                placeholder="내용을 입력하세요"
                                className="content-textarea"
                                value={contents[1]}
                                onChange={(e) => handleContentChange(1, e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="photo-upload-box">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(1, e.target.files?.[0] || null)}
                                style={{ display: 'none' }}
                                id="photo-upload-1"
                            />
                            <label htmlFor="photo-upload-1" className="photo-label">
                                <img src={photo} alt='photo' className='photo-input' />
                            </label>
                        </div>
                        
                        {/* 3행: 사진 + 텍스트 */}
                        <div className="photo-upload-box">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(2, e.target.files?.[0] || null)}
                                style={{ display: 'none' }}
                                id="photo-upload-2"
                            />
                            <label htmlFor="photo-upload-2" className="photo-label">
                                <img src={photo} alt='photo' className='photo-input' />
                            </label>
                        </div>
                        <div className="text-upload-box">
                            <textarea 
                                placeholder="내용을 입력하세요"
                                className="content-textarea"
                                value={contents[2]}
                                onChange={(e) => handleContentChange(2, e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>
                </div>

                {/* 오른쪽 섹션 - 폼 */}
                <div className="right-section">
                    <div className="form-container">
                        {/* Country 입력 */}
                        <div className="form-group-country">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                placeholder="국가를 입력하세요"
                            />
                        </div>

                        {/* Date 선택 */}
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <div className="date-container">
                                <div className="calendar-placeholder">
                                    <div className="calendar">
                                        <div className="calendar-header">
                                            <span className="month">
                                                {monthNames[currentMonth.getMonth()]}
                                            </span>
                                            <div className="nav-arrows">
                                                <span onClick={handlePrevMonth}>&lt;</span>
                                                <span onClick={handleNextMonth}>&gt;</span>
                                            </div>
                                        </div>
                                        <div className="calendar-grid">
                                            <div className="weekdays">
                                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                    <span key={i} className="weekday">{day}</span>
                                                ))}
                                            </div>
                                            <div className="dates">
                                                {(() => {
                                                    const daysInMonth = getDaysInMonth(currentMonth);
                                                    const firstDay = getFirstDayOfMonth(currentMonth);
                                                    const daysArray = [];

                                                    // 이전 달의 빈 칸들
                                                    for (let i = 0; i < firstDay; i++) {
                                                        daysArray.push(
                                                            <span key={`empty-${i}`} className="date other-month"></span>
                                                        );
                                                    }

                                                    // 현재 달의 날짜들
                                                    for (let day = 1; day <= daysInMonth; day++) {
                                                        daysArray.push(
                                                            <span 
                                                                key={day}
                                                                className={`date current-month ${isDateSelected(day) ? 'selected' : ''}`}
                                                                onClick={() => handleDateClick(day)}
                                                            >
                                                                {day}
                                                            </span>
                                                        );
                                                    }

                                                    return daysArray;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    {/* Expense 입력 */}
                        <div className="form-group-expense">
                            <label htmlFor="expense">Expense</label>
                            <input
                                type="text"
                                id="expense"
                                value={expense}
                                onChange={(e) => setExpense(e.target.value)}
                                placeholder="비용을 입력하세요"
                            />
                        </div>

                        {/* 업로드 버튼 */}
                        <button className="upload-btn" onClick={handleSaveDiary}>
                            <span>↑</span>
                        </button>
                    </div>

                    <div className="bottom-illustration">
                        <img
                            src={underimg}
                            alt='underimg'
                            className='under-img'
                        />
                    </div>                                   
            </div>
        </div>
    );
};

export default TravelDiary;