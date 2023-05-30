import React , { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatChungmu.css';

const SeeyaSeatChungmu = ({ average, handleSeatClick }) => {
    const getSeatColor = (averageValues, rowIndex, seatIndex, areaIndex) => {
      // seat color logic
    };

    const [activeTab, setActiveTab] = useState("C-Floor1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div>
            <Header/>

            <div className="tab-bar">
            <button
            className={activeTab === "C-Floor1" ? "active" : ""}
            onClick={() => handleTabClick("C-Floor1")}
            >
            1층
            </button>
            <button
            className={activeTab === "C-Floor2" ? "active" : ""}
            onClick={() => handleTabClick("C-Floor2")}
            >
            2층
            </button>
            <button
            className={activeTab === "C-Floor3" ? "active" : ""}
            onClick={() => handleTabClick("C-Floor3")}
            >
            3층
            </button>
         </div>


         {activeTab === "C-Floor1" && (
            <div>
                <p className="SS-C-Title">충무아트센터 대극장 1층</p>

                {/* 1층 A구역 */}

                <div className="C-Area-left-1">
                <p className="C-Area-left-Tag">[A]</p>
                {Array.from({ length: 20 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from({ length: rowIndex < 3 ? 7 : rowIndex === 3 ? 8 : 9 }, (_, seatIndex) => {
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


                {/* 1층 B구역 */}

                <div className="C-Area-Center-1">
            <p className="C-Area-Center-Tag">[B]</p>
            {Array.from({ length: 20 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 17 : 16 },
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
                {/* 1층 C구역 */}

                <div className="C-Area-Right-1">
                <p className="C-Area-Right-Tag">[C]</p>
                {Array.from({ length: 20 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from({ length: rowIndex < 3 ? 7 : rowIndex === 3 ? 8 : 9 }, (_, seatIndex) => {
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


         {activeTab === "C-Floor2" && (
            <div>





                 {/* 2층 A구역 */}
                {/* 2층 B구역 */}
                {/* 2층 C구역 */}





            </div>
         )}


         {activeTab ==="C-Floor3" && (
            <div>


                
                {/* 3층 A구역 */}
                {/* 3층 B구역 */}
                {/* 3층 C구역 */}





            </div>
         )}



        </div>
    )
}

    export default SeeyaSeatChungmu;