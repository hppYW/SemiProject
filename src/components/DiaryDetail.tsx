import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import './DiaryDetail.css';

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

interface Comment {
    id: number;
    body: string;
    nickname: string;
    createdtime: string;    // DTO에 맞춰서 lowercase
    updatedtime: string;    // DTO에 맞춰서 lowercase  
    diaryId: number;
}

const DiaryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    
    const [diary, setDiary] = useState<Diary | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetchDiary();
        fetchComments();
    }, [id]);

    const fetchDiary = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/api/diaries/${id}`);
            setDiary(response.data);
        } catch (error) {
            console.error('다이어리 조회 실패:', error);
            setError('다이어리를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            console.log('댓글 목록 조회 시작:', id);
            const response = await axios.get(`http://localhost:8090/api/diaries/${id}/comments`);
            console.log('댓글 목록 조회 성공:', response.data);
            setComments(response.data);
        } catch (error) {
            console.error('댓글 조회 실패:', error);
            setComments([]); // 에러 시 빈 배열
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        if (!newComment.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        try {
            setCommentLoading(true);
            
            const commentData = {
                body: newComment.trim(),
                nickname: user?.nickname || '익명',
                diaryId: parseInt(id!),
            };

            const response = await axios.post(`http://localhost:8090/api/diaries/${id}/comments`, commentData);
            console.log('댓글 작성 성공:', response.data);
            
            setNewComment('');
            
            // 댓글 목록 즉시 새로고침
            await fetchComments();
            
        } catch (error) {
            console.error('댓글 작성 실패:', error);
            alert('댓글 작성에 실패했습니다.');
        } finally {
            setCommentLoading(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        console.log('삭제 시도 - commentId:', commentId, typeof commentId); // 추가
    
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

        try {
            const url = `http://localhost:8090/api/comments/${commentId}`;
            console.log('삭제 URL:', url); // 추가
            
            await axios.delete(url);
            console.log('댓글 삭제 성공');
            
            await fetchComments();
            
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            // axios 에러인지 확인
            if (axios.isAxiosError(error)) {
                console.log('HTTP 상태:', error.response?.status);
                console.log('에러 메시지:', error.response?.data);
            } else if (error instanceof Error) {
                console.log('일반 에러:', error.message);
            } else {
                console.log('알 수 없는 에러:', error);
            }
            alert('댓글 삭제에 실패했습니다.');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderPhotos = () => {
        console.log('=== renderPhotos 함수 호출됨 ===');
        console.log('diary 객체:', diary);
        console.log('photo1Url:', diary?.photo1Url);
        console.log('photo2Url:', diary?.photo2Url);
        console.log('photo3Url:', diary?.photo3Url);

        const photos = [diary?.photo1Url, diary?.photo2Url, diary?.photo3Url]
        .filter((photo): photo is string => photo !== null && photo !== undefined && photo !== '');

        if (photos.length === 0) return null;

        // 파일명 추출 함수  
        const extractFileName = (fullPath: string): string => {
            if (!fullPath) return '';
            // C:\uploads\파일명.jpg → 파일명.jpg
            return fullPath.replace(/^.*[\\\/]/, '');
        };

        return (
            <div className="diary-photos">
                {photos.map((photo, index) => {
                    const filename = extractFileName(photo);
                    const imageUrl = `http://localhost:8090/uploads/${filename}`;
                    
                    console.log('DB 경로:', photo);
                    console.log('파일명:', filename);
                    console.log('URL:', imageUrl);
                    
                    return (
                        <div key={index} className="photo-container">
                            <img 
                                src={imageUrl}
                                alt={`여행 사진 ${index + 1}`}
                                className="diary-photo"
                                onError={(e) => {
                                    console.error('이미지 로드 실패:', imageUrl);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };
    const renderContent = () => {
        const contents = [diary?.content1, diary?.content2, diary?.content3].filter(Boolean);
        
        if (contents.length === 0) return <p className="no-content">작성된 내용이 없습니다.</p>;

        return (
            <div className="diary-contents">
                {contents.map((content, index) => (
                    <div key={index} className="content-section">
                        <p>{content}</p>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="diary-detail-container">
                <div className="loading">로딩 중...</div>
            </div>
        );
    }

    if (error || !diary) {
        return (
            <div className="diary-detail-container">
                <div className="error">{error || '다이어리를 찾을 수 없습니다.'}</div>
                <button onClick={() => navigate('/all-diaries')} className="back-btn">
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="diary-detail-container">
            {/* 헤더 */}
            <div className="detail-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    ← 뒤로가기
                </button>
                <div className="header-actions">
                    <button onClick={() => navigate('/alldiaries')} className="list-btn">
                        전체 목록
                    </button>
                </div>
            </div>

            {/* 다이어리 메인 */}
            <div className="diary-main">
                <div className="diary-header-info">
                    <div className="country-badge">{diary.country}</div>
                    <h1 className="diary-title">{diary.title || '제목 없음'}</h1>
                    <div className="diary-meta">
                        <span className="author">by {diary.nickname}</span>
                        <span className="date">{formatDate(diary.travelDate)}</span>
                        <span className="expense">₩{diary.expense?.toLocaleString()}</span>
                    </div>
                </div>

                {/* 사진들 */}
                {renderPhotos()}

                {/* 내용 */}
                <div className="diary-content">
                    <h3>여행 기록</h3>
                    {renderContent()}
                </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="comments-section">
                <h3>댓글 ({comments.length})</h3>
                
                {/* 댓글 작성 폼 */}
                {isLoggedIn ? (
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <div className="comment-input-container">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="이 여행에 대한 댓글을 남겨보세요..."
                                className="comment-input"
                                rows={3}
                                maxLength={500}
                            />
                            <div className="comment-form-footer">
                                <span className="char-count">{newComment.length}/500</span>
                                <button 
                                    type="submit" 
                                    className="comment-submit"
                                    disabled={commentLoading || !newComment.trim()}
                                >
                                    {commentLoading ? '작성 중...' : '댓글 작성'}
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="login-prompt">
                        <p>댓글을 작성하려면 로그인이 필요합니다.</p>
                        <button onClick={() => navigate('/login')} className="login-btn">
                            로그인하기
                        </button>
                    </div>
                )}

                {/* 댓글 목록 */}
                <div className="comments-list">
                    {comments.length === 0 ? (
                        <div className="no-comments">
                            <p>아직 댓글이 없습니다.</p>
                            <p>첫 번째 댓글을 남겨보세요! 💬</p>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-header">
                                    <span className="comment-author">{comment.nickname}</span>
                                    <span className="comment-date">{formatDateTime(comment.createdtime)}</span>
                                    {user?.nickname === comment.nickname && (
                                        <button 
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="delete-comment"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                                <div className="comment-content">
                                    {comment.body}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiaryDetail;