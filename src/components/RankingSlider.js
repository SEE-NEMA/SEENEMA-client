import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../screens/styles/RankingSlider.css";

function RankingSlider() {
  const [ranking, setRanking] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://43.200.58.174:8080/api/v1/')
      .then(response => {
        setRanking(response.data.musicalRank || []);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % ranking.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [ranking]);

  return (
    <div className="ranking-slider">
     
      {ranking.length > 0 && (
        <p className="ranking-info">{`${currentIndex + 1}. ${ranking[currentIndex].title}`}</p>
      )}
    </div>
  );
}

export default RankingSlider;