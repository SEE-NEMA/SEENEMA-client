import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SeeyaReview() {
  const { theaterId, viewNo } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
      .then(response => {
        setReview(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId, viewNo]);

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{review.title}</p>
      <p>{review.content}</p>
      <p>{review.nickName}</p>
    </div>
  );
}

export default SeeyaReview;
