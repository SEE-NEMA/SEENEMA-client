import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatBlueSquare.css';

const SeeyaSeatBlueSquare = ({ average, handleSeatClick }) => {
  const getSeatColor = (averageValues, rowIndex, seatIndex, areaIndex) => {
    // seat color logic
  };

  const [activeTab, setActiveTab] = useState("Floor1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />

      <div className="tab-bar">
        <button
          className={activeTab === "Floor1" ? "active" : ""}
          onClick={() => handleTabClick("Floor1")}
        >
          1층
        </button>
        <button
          className={activeTab === "Floor2" ? "active" : ""}
          onClick={() => handleTabClick("Floor2")}
        >
          2층
        </button>
        <button
          className={activeTab === "Floor3" ? "active" : ""}
          onClick={() => handleTabClick("Floor3")}
        >
          3층
        </button>
      </div>

      {activeTab === "Floor1" && (
        <div>
          <p className="SeeyaSeatBlueSquare-title">1층</p>

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
          </div>
        </div>
      )}

      {activeTab === "Floor2" && (
        <div>
          <p className="SeeyaSeatBlueSquare-title">2층</p>
            {/* [A] 구역 */}
              <div className="area-left-2">
              <p className="area-left-tag-2">[A]</p>
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                  {Array.from({ length: 15}, (_, seatIndex) => {
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

              {Array.from({ length: 4 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 6}`} key={rowIndex}>
                  {Array.from({ length: 13 }, (_, seatIndex) => {
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

                {Array.from({ length: 1 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 10}`} key={rowIndex}>
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

            <div className="area-center-2">
            <p className="area-center-tag">[B]</p>
            {Array.from({ length: 5 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                  {Array.from({ length: 16}, (_, seatIndex) => {
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

            {Array.from({ length: 2 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 6}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 14 : 13 },
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

            {Array.from({ length: 3 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 8}`} key={rowIndex}>
                  {Array.from({ length: 13}, (_, seatIndex) => {
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

          <div className="area-right-2">
              <p className="area-right-tag">[C]</p>
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                  {Array.from({ length: 15}, (_, seatIndex) => {
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

              {Array.from({ length: 4 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 6}`} key={rowIndex}>
                  {Array.from({ length: 13 }, (_, seatIndex) => {
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

                {Array.from({ length: 1 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 10}`} key={rowIndex}>
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
        )}

         {activeTab === "Floor3" && (   
          <div>
             <p className="SeeyaSeatBlueSquare-title">3층</p>

             <div className="area-left-3">
              <p className="area-left-tag">[A]</p>
              {Array.from({ length: 2 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                  {Array.from({ length: 16}, (_, seatIndex) => {
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

              {Array.from({ length: 1 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 3}`} key={rowIndex}>
                  {Array.from({ length: 12 }, (_, seatIndex) => {
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

                {Array.from({ length: 2 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 4}`} key={rowIndex}>
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

              {Array.from({ length: 1 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 6}`} key={rowIndex}>
                  {Array.from({ length: 16 }, (_, seatIndex) => {
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

            <div className="area-center-3">
            <p className="area-center-tag">[B]</p>
            {Array.from({ length: 5 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                  {Array.from({ length: 16}, (_, seatIndex) => {
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

          

{Array.from({ length: 1 }, (_, rowIndex) => (
  <div className={`row-${rowIndex + 6}`} key={rowIndex}>
    {Array.from({ length: 7 }, (_, seatIndex) => {
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
    <div className="area-center-3-empty-seat-1" />
    <div className="area-center-3-empty-seat-2" />
    {Array.from({ length: 7 }, (_, seatIndex) => {
      const seatColor = getSeatColor(average, rowIndex, seatIndex + 9, 1);
      return (
        <div
          className="seat"
          key={seatIndex + 9}
          style={{
            backgroundColor: seatColor,
          }}
          onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 9, 1)}
        ></div>
      );
    })}
  </div>
))}
          </div>

            <div className="area-right-3">
              <p className="area-right-tag">[C]</p>
               {Array.from({ length: 2 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                  {Array.from({ length: 16}, (_, seatIndex) => {
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

              {Array.from({ length: 1 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 3}`} key={rowIndex}>
                  {Array.from({ length: 12 }, (_, seatIndex) => {
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

                {Array.from({ length: 2 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 4}`} key={rowIndex}>
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

              {Array.from({ length: 1 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 6}`} key={rowIndex}>
                  {Array.from({ length: 16 }, (_, seatIndex) => {
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
         )}   
    </div>
  );
};

export default SeeyaSeatBlueSquare;
