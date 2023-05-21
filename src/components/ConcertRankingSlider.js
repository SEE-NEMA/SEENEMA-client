import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../screens/styles/ConcertRankingSlider.css";

function ConcertRankingSlider() {
  const [ranking, setRanking] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState()

  useEffect(() => {
    axios.get('http://43.200.58.174:8080/api/v1/')
      .then(response => {
        setRanking(response.data.concertRank);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % ranking.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [ranking]);

  return (
    <div className="C-ranking-slider">
      
      {ranking.length > 0 && (
        <p className="C-ranking-info">{`${currentIndex + 1}. ${ranking[currentIndex].title}`}</p>
      )}
    </div>
  );
}

export default ConcertRankingSlider;
