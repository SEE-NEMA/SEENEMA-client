/*시야 후기 모아보기 화면 */

import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Header from "../../Header";
import '../styles/Review.css';
import {FaSearch} from "react-icons/fa";
import axios from "axios";


const Review = () =>
{
    const [review, setReview] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);

    useEffect(() => {
        axios({
            method:'GET',
            url : `http://43.200.58.174:8080/api/v1/theater-review/`
        }).then(response => {
            const sortedReview = response.data.sort((a,b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setReview(sortedReview)
        })
    }, [])

    const toggleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    }

    return(
        <div>
            <Header/>
            <div className="Review-WrapContent">
            <input className="Review-Input" placeholder="공연 혹은 공연장 이름을 검색해주세요"></input>
                <button className="Review-Search">
                    <FaSearch size="30"/>
                </button>
            <Link to="/perform_review">
                <button className="Review-WriteBtn">글쓰기</button>
            </Link>
            <hr className="Review-hr"/>
            <div className="Review-Content">
                <ul>
                {review.slice(0, showAllReviews ? review.length : 5).map(reviews => (
                    <li key={reviews.id}>
                        <span style={{marginRight : '20px'}}>{reviews.title}</span>
                        <span style={{marginRight : '20px'}}>{reviews.createdAt}</span>
                        <span style={{marginRight : '20px'}}>{reviews.nickname}</span>
                    </li>
                ))}
                </ul>
                {!showAllReviews && (
                    <button onClick={toggleShowAllReviews}>더보기</button>
                )}
            </div>
            </div>
        </div>
    );
}

export default Review;