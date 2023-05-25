import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatBlueSquare.css';

const SeeyaSeatBlueSquare = ({ average, handleSeatClick }) => {
  const getSeatColor = (averageValues, rowIndex, seatIndex, areaIndex) => {
    
  };

  return (
    <div>

    <Header />

      {/* [A] 구역 */}

      <div className="area-left">
        <p className="area-left-tag">[A]</p>
        {Array.from({ length: 7 }, (_, rowIndex) => (
          <div className={`row-${rowIndex + 1}`} key={rowIndex}>
            {Array.from({ length: rowIndex + 8 }, (_, seatIndex) => {
              const seatColor = getSeatColor(average, rowIndex, seatIndex, 1);
              return (
                <div
                  className="seat"
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

        {Array.from({ length: 15 }, (_, rowIndex) => (
           
          <div className={`row-${rowIndex + 8}`} key={rowIndex}>
            {Array.from({ length: 15 }, (_, seatIndex) => {
              const seatColor = getSeatColor(average, rowIndex, seatIndex, 1);
              return (
                <div
                  className="seat"
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
        
      </div>

      {/* [B] 구역 */}

      <div className="area-center">
        <p className="area-center-tag">[B]</p>
        {Array.from({ length: 7 }, (_, rowIndex) => (
          <div className={`row-${rowIndex + 1}`} key={rowIndex}>
            {Array.from(
              { length: rowIndex % 2 === 0 ? 16 : 17 },
              (_, seatIndex) => {
                const seatColor = getSeatColor(average, rowIndex, seatIndex, 2);
                return (
                  <div
                    className="seat"
                    key={seatIndex}
                    style={{
                      backgroundColor: seatColor,
                    }}
                    onClick={() =>
                      handleSeatClick(rowIndex + 1, seatIndex + 1, 2)
                    }
                  ></div>
                );
              }
            )}
            
          </div>
        ))}

        {Array.from({ length: 15 }, (_, rowIndex) => (
           
           <div className={`row-${rowIndex + 8}`} key={rowIndex}>
             {Array.from(
                { length: rowIndex % 2 === 0 ? 16 : 17 },
                 (_, seatIndex) => {
               const seatColor = getSeatColor(average, rowIndex, seatIndex, 1);
               return (
                 <div
                   className="seat"
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
      </div>

      {/* [C] 구역 */}
      
      <div className="area-right">
        <p className="area-right-tag">[C]</p>
        {Array.from({ length: 7 }, (_, rowIndex) => (
          <div className={`row-${rowIndex + 1}`} key={rowIndex}>
            {Array.from({ length: rowIndex + 8 }, (_, seatIndex) => {
              const seatColor = getSeatColor(average, rowIndex, seatIndex, 3);
              return (
                <div
                  className="seat"
                  key={seatIndex}
                  style={{
                    backgroundColor: seatColor,
                  }}
                  onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1, 3)}
                ></div>
              );
            })}
          </div>
        ))}

        {Array.from({ length: 15 }, (_, rowIndex) => (
           
           <div className={`row-${rowIndex + 8}`} key={rowIndex}>
             {Array.from({ length: 15 }, (_, seatIndex) => {
               const seatColor = getSeatColor(average, rowIndex, seatIndex, 1);
               return (
                 <div
                   className="seat"
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
      </div>
    </div>
  );
};

export default SeeyaSeatBlueSquare;
