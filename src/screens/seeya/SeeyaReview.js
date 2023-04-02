import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaReview.css';

function SeeyaReview() {
  const { theaterId, viewNo } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
      .then(response => {
        setReview(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId, viewNo]);

 
  return (
    <div>
    <Header/>
    <div className = "SeeyaReview-Container">
        <p className= "SeeyaReview-Review">극장 시야 후기</p>

        <hr></hr>
        
        <p className="SeeyaReview-title">"{review.title}"</p>

        <div className = "SeeyaReview-Contents">
        <p className = "SeeyaReview-content">내용 : {review.content}</p>
        <p className = "SeeyaReview-nickName">닉네임 : {review.nickName}</p>
        </div>

        <button className = "SeeyaReview-modify">수정</button>
        <button className = "SeeyaReview-delete">삭제</button>
        
        <button className = "SeeyaReview-register"></button> 
    </div>
    </div>
  );
}

export default SeeyaReview;
