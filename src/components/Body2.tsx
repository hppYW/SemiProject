import './Body2.css'
import { Link } from 'react-router-dom';
import leftpic1 from '../assets/pic1.svg'
import leftpic2 from '../assets/pic2.svg'
import leftpic3 from '../assets/blue plane.svg'
import rightpic1 from '../assets/stars.svg'
import rightpic2 from '../assets/check mark.svg'
import bottompic from '../assets/pic3.svg'

const Body2:React.FC = () => {
    return(
        <div className='Body2'>
            <div className='body2-container'>
                <div className='left-pictures'>
                    <img
                    src={leftpic1}
                    alt='leftpic'
                    className='left-pic1'
                    ></img>
                    <img
                    src={leftpic2}
                    alt='leftpic'
                    className='left-pic2'
                    ></img>
                    <img
                    src={leftpic3}
                    alt='leftpic'
                    className='left-pic3'
                    ></img>
                </div>
                <div className='right-part'>
                    <div className='best-text'>
                        <img
                        src={rightpic1}
                        alt='rightpic'
                        className='best-img'
                    ></img>
                    <h3>Best 여행지</h3>
                    </div>
                    <div>
                        <div>
                            <button><Link to="/traveldiary" className="write-diary">여행일기 작성하기</Link></button>
                        </div>      
                        <a href='#' className='to-traveldiary'>여행일기 보러가기</a>  
                    </div>
                </div>
                <div className='best-diary'>

                </div>
                <div className='most-adopted'>
                    <div>
                        <img
                        src={rightpic2}
                        alt='rightpic'
                        className='check-img'
                        ></img>
                        <p className='adopted-text'>가장 많이 채택된 여행지</p>
                    </div>
                </div>
                <img
                src={bottompic}
                alt='bottompic'
                className='bottompic'
                ></img>
            </div>
        </div>  
    )
}

export default Body2;