import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaDetail.css';
import {FaSearch} from "react-icons/fa";

function SeeyaDetail() {
  const { theaterId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId]);

  return (
    
      <div>
        <Header />
        <div className="SeeyaMain-Wrap">
          <input className="SeeyaMain-input" placeholder="공연장 이름을 검색해주세요" />
          <button className="SeeyaMain-Search">
            <FaSearch size="30" />
          </button>
          <hr className="SeeyaMain-hr" />
        </div>
        <div className="SeeyaDetail-Container">
          {reviews.map((review, index) => (
            <div key={index} className="SeeyaDetail-Wrap">
              <p className="SeeyaDetail-title">{review.title}</p>
              <p className="SeeyaDetail-createdAt">{review.createdAt} {review.nickName}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default SeeyaDetail;