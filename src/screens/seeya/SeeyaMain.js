/* 시야 페이지 진입 시 메인화면 */

import React from "react";
import {Link} from 'react-router-dom';
import Header from "../../Header";
import '../styles/SeeyaMain.css';
import {FaSearch} from "react-icons/fa";
import axios from "axios"; 
import { useEffect } from "react";
import { useState } from "react";

function SeeyaMain() {

const Review = () =>
{
    const [review, setReview] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);

    useEffect(() => {
        axios({
            method:'GET',
            url : `http://43.200.58.174:8080/api/v1/view-review/`
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

    return (
        <div>
           <Header/>
           <div className = "SeeyaMain-Wrap">
            <input className="SeeyaMain-input" placeholder="공연장 이름을 검색해주세요"></input>
                <button className="SeeyaMain-Search">
                    <FaSearch size="30"/>
                </button>
                <hr className = "SeeyaMain-hr"/>
            </div>
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
    )
}
}

export default SeeyaMain;