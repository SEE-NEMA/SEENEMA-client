import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeat.css';


const SeeyaSeat = () => {
  const navigate = useNavigate();
  const { theaterId, x, y, z } = useParams();
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({ z: 0, x: 0, y: 0 });
  const [average, setAverage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://43.200.58.174:8080/api/v1/seats/${theaterId}/`
        );
        const averageData = {};
        response.data.forEach(seat => {
          const { z, x, y, average } = seat;
          averageData[`${z}-${x}-${y}`] = average;
        });
        setAverage(averageData);
        console.log(averageData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [theaterId]);

  const getSeatColor = (averageValues, rowIndex, seatIndex, areaIndex) => {
    const seatAverage = averageValues[`${areaIndex}-${rowIndex + 1}-${seatIndex + 1}`];

    if (seatAverage) {
      switch (seatAverage) {
        case 1:
          return '#f22713';
        case 2:
          return '#ff9924';
        case 3:
          return '#ffe647';
        case 4:
          return '#87d37c';
        case 5:
          return '#00b16a';
        default:
          return ''; // Default color
      }
    } else {
      return ''; // Default color if seat average is not found
    }
  };

  const handleSeatClick = async (x, y, z) => {
    try {
      const response = await axios.get(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
      );
      setModalData(response.data);
      setSelectedSeat({ z, x, y });
      console.log(z + '층' + x + '열' + y + '번');
      navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
    } catch (error) {
      console.error(error);
      alert(z + '층' + x + '열' + y + '번 좌석에 리뷰가 등록되어 있지 않습니다');
    }
  };

  return (
    <div>
      <Header />

      {/* 스테이지 */}
      <div className="Stage">Stage</div>

      {/* [1층] */}
      <div className="Floor-1">
        {/* [나] 구역 */}
        <div className="seatmapB">
          <p className="seetmapB-tag">[나]</p>
          {/* 6행으로 구성, 마지막 행은 좌석 10개 */}
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <div className={`row-${rowIndex + 1}`} key={rowIndex}>
              {Array.from({ length: 9 }, (_, seatIndex) => {
                const seatColor = getSeatColor(average, rowIndex, seatIndex, 1);
                return (
                  <div
                    className="arco-seat"
                    key={seatIndex}
                    style={{
                      backgroundColor: seatColor,
                    }}
                    onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1, 1)}
                  ></div>
                );
              })}
            </div>
          ))}
          <div className="row-lastB">
            {Array.from({ length: 10 }, (_, seatIndex) => (
              <div className="arco-seat" key={seatIndex}></div>
            ))}
          </div>
        </div>
        {/* [나] 구역 끝 */}

        {/* [가] 구역 */}
        <div className="seatmapA">
          <p className="seetmapA-tag">[가]</p>
          {/* 6행으로 구성, 마지막 행은 좌석 10개 */}
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <div className={`row-${rowIndex + 1}`} key={rowIndex}>
              {Array.from({ length: 9 }, (_, seatIndex) => {
                const seatColor = getSeatColor(average, rowIndex, seatIndex + 9, 1);
                return (
                  <div
                    className="arco-seat"
                    key={seatIndex}
                    style={{
                      backgroundColor: seatColor,
                    }}
                    onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 10, 1)}
                  ></div>
                );
              })}
            </div>
          ))}
          <div className="row-lastA">
            {Array.from({ length: 10 }, (_, seatIndex) => (
              <div className="arco-seat" key={seatIndex}></div>
            ))}
          </div>
        </div>
        {/* [가] 구역 끝 */}
      </div>
    </div>
  );
};

export default SeeyaSeat;
