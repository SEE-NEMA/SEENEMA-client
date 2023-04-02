import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaDetail.css';
import { FaSearch } from "react-icons/fa";
import Seeya from '../SB_Components/Seeya';

function SeeyaDetail() {
  const { theaterId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}`)
      .then(response => {
        console.log(response);
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId]);


  const handleSearch = () => {
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/search?q=${encodedSearchQuery}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="SeeyaMain-Wrap">
        <input 
          className="SeeyaMain-input" 
          placeholder="좌석 검색 (ex:1층, 1층5열)" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="SeeyaMain-Search" onClick={handleSearch}>
          <FaSearch size="30" />
        </button>
        <hr className="SeeyaMain-hr" />
      </div>

      <div>
        <Link to={`/SeeyaUpload/${theaterId}`} className="SeeyaDetail-link">
          <button className="SeeyaDetail-button">글쓰기</button>
        </Link>
      </div>

      <div className="SeeyaDetail-Container">
        {reviews.map((review, index) => (
          <div key={index} className="SeeyaDetail-Wrap"> 
            <Link to={`/view-review/${theaterId}/${review.viewNo}`} className="SeeyaDetail-title">
              {review.title}
            </Link>
            <p className="SeeyaDetail-createdAt">{review.createdAt} {review.nickName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeeyaDetail;