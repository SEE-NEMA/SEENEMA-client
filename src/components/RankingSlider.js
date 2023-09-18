import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown, FaPlusCircle } from 'react-icons/fa'; 
import "../screens/styles/RankingSlider.css";

function RankingSlider() {
  const [ranking, setRanking] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rankingChange, setRankingChange] = useState("new");

  useEffect(() => {
    axios.get('http://43.200.58.174:8080/api/v1/')
      .then(response => {
        setRanking(response.data.musicalRank || []);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % ranking.length;
      const upDownValue = ranking[nextIndex].upDown;
      const rangeValue = ranking[nextIndex].range;

      if (upDownValue === 0 && rangeValue === 0) {
        setRankingChange(<FaPlusCircle/>);
      } else if (upDownValue === 1 && rangeValue === 0) {
        setRankingChange(<FaPlusCircle/>);
      } else if (upDownValue === 1 && rangeValue !== 0) {
        setRankingChange(<FaArrowUp />);
      } else if (upDownValue === 2 && rangeValue !== 0) {
        setRankingChange(<FaArrowDown />);
      }

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [ranking, currentIndex]);

  return (
    <div className="ranking-slider">
      {ranking.length > 0 && (
        <p className="ranking-info">{`${currentIndex + 1}. ${ranking[currentIndex].title} `}
        {rankingChange}
        </p>
      )}
    </div>
  );
}

export default RankingSlider;