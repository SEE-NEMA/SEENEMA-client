import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatBlueSquare.css';

const SeeyaSeatBlueSquare = () => {
  const navigate = useNavigate();
  const { theaterId } = useParams();
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

  const handleSeatClick = async (z, x, y) => {
    try {
      const response = await axios.get(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
      );
      console.log(z + '층' + x + '열' + y + '번');
      navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />

      <p className="SeeyaSeatBlueSquare-title">1층</p>

      {/* [A] 구역 */}
      <div className="area-left">
        <p className="area-left-tag">[A]</p>
        {Array.from({ length: 7 }, (_, rowIndex) => (
          <div className={`row-${rowIndex + 1}`} key={rowIndex}>
            {Array.from({ length: rowIndex + 8 }, (_, seatIndex) => {
              const seatColor = getSeatColor(average, rowIndex, seatIndex+7, 1);
              return (
                <div
                  className="seat"
                  key={seatIndex}
                  style={{
                    backgroundColor: seatColor,
                  }}
                  onClick={() => handleSeatClick(1, rowIndex + 1, seatIndex+8)}
                ></div>
              );
            })}
          </div>
        ))}
        {Array.from({ length: 15 }, (_, rowIndex) => (
          <div className={`row-${rowIndex + 8}`} key={rowIndex}>
            {Array.from({ length: 15 }, (_, seatIndex) => {
              const seatColor = getSeatColor(average, rowIndex+8, seatIndex, 1);
              return (
                <div
                  className="seat"
                  key={seatIndex}
                  style={{
                    backgroundColor: seatColor,
                  }}
                  onClick={() => handleSeatClick(1, rowIndex + 8, seatIndex + 1)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="area-center">
  <p className="area-center-tag">[B]</p>
  {Array.from({ length: 7 }, (_, rowIndex) => (
    <div className={`row-${rowIndex + 1}`} key={rowIndex}>
      {/* 9, 10, 11, 12 */}
      {Array.from(
        { length: rowIndex % 2 === 0 ? 16 : 17 },
        (_, seatIndex) => {
          const seatNumber = seatIndex + 16 + rowIndex * 1;
          const seatColor = getSeatColor(average, rowIndex, seatIndex + 8, 1);
          return (
            <div
              className="seat"
              key={seatIndex}
              style={{
                backgroundColor: seatColor,
              }}
              onClick={() => handleSeatClick(1, rowIndex + 1, seatNumber)}
            ></div>
          );
        }
      )}
    </div>
  ))}
  {Array.from({ length: 15 }, (_, rowIndex) => (
  <div className={`row-${rowIndex + 8}`} key={rowIndex}>
    {/* 9, 10, 11, 12 */}
    {Array.from(
      { length: rowIndex % 2 === 0 ? 16 : 17 },
      (_, seatIndex) => {
        const seatColor = getSeatColor(average, rowIndex+8, seatIndex+16, 2);
        return (
          <div
            className="seat"
            key={seatIndex}
            style={{
              backgroundColor: seatColor,
            }}
            onClick={() => handleSeatClick(1, rowIndex + 8, seatIndex+16)}
          ></div>
        );
      }
    )}
  </div>
))}

</div>


      {/* [C] 구역 */}
      <div className="area-right">
        <p className="area-right-tag">[C]</p>
        {Array.from({ length: 7 }, (_, rowIndex) => (
  <div className={`row-${rowIndex + 1}`} key={rowIndex}>
    {Array.from({ length: rowIndex + 8 }, (_, seatIndex) => {
      const seatNumber = rowIndex + seatIndex + (rowIndex % 2 === 0 ? 25 : 26);
      const startingSeatNumber = rowIndex % 2 === 0 ? 25 : 27;
      const seatColor = getSeatColor(average, rowIndex, seatIndex + startingSeatNumber, 1);
      return (
        <div
          className="seat"
          key={seatIndex}
          style={{
            backgroundColor: seatColor,
          }}
          onClick={() => handleSeatClick(1, rowIndex + 1, seatNumber)}
        ></div>
      );
    })}
  </div>
))}



        {Array.from({ length: 15 }, (_, rowIndex) => (
          <div className={`row-${rowIndex + 8}`} key={rowIndex}>
            {Array.from({ length: 15 }, (_, seatIndex) => {
              const seatNumber = 32 + rowIndex + seatIndex;
              const seatColor = getSeatColor(average, rowIndex, seatIndex, 3);
              return (
                <div
                  className="seat"
                  key={seatIndex}
                  style={{
                    backgroundColor: seatColor,
                  }}
                  onClick={() => handleSeatClick(1, rowIndex + 8, seatNumber)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeyaSeatBlueSquare;