import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SeeyaDetail() {
  const { theaterId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/view-review/${item.theaterId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId]);

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.nickName}</p>
          <p>{review.title}</p>
          <p>{review.createdAt}</p>
        </div>
      ))}
    </div>
  );
}

export default SeeyaDetail;