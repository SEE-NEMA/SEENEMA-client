import React , { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatMasterCard.css';

const SeeyaSeatMasterCard = () => {
    const navigate = useNavigate();
    const {theaterId} = useParams();
    const [seatColors, setSeatColors] = useState([]);

    useEffect(() => {
        const fetchSeatColors = async () => {
          try {
            const response = await axios.get('http://43.200.58.174:8080/api/v1/seats/30');
            const seatColorsData = response.data;
            setSeatColors(seatColorsData);
            console.log(seatColors)
          } catch (error) {
            console.log('Error fetching seat colors:', error);
          }
        };
    
        fetchSeatColors();
      }, []);
    
      const getSeatColor = (z, x, y) => {
        const seatAverage = seatColors.find(
          (seatColor) => 
          seatColor.z === z &&
          seatColor.y === y &&
          seatColor.x === x &&
          seatColor.postedYN
        );
    
        if (seatAverage) {
          switch (seatAverage.average) {
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



    const [activeTab, setActiveTab] = useState("M-Floor1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return(
        <div>
            <Header/>

            <div className="tab-bar">
            <button
            className={activeTab === "M-Floor1" ? "active" : ""}
            onClick={() => handleTabClick("M-Floor1")}
            >
            1층
            </button>
            <button
            className={activeTab === "M-Floor2" ? "active" : ""}
            onClick={() => handleTabClick("M-Floor2")}
            >
            2층
            </button>
         </div>

        {activeTab === "M-Floor1" && (
            <div>
               <p className = "M-Area-Left-1-Title">1층은 스탠딩석이므로 좌석 정보를 제공하지 않습니다.</p>
            </div>
        )}


        {activeTab === "M-Floor2" && (
            <div>
            <p className="SS-C-Title">블루스퀘어 마스터카드홀 2층</p>

            {/* 2층 A구역 */}

            <div className="M-Area-Left-2">
                <p className="C-Area-left-Tag">[A]</p>
                {Array.from({ length: 8 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from(
                      { length: rowIndex < 3 ? 12 : rowIndex < 7 ? 11 : 10 },
                      (_, seatIndex) => {
                        let seatNumber;
                        if (rowIndex < 3) {
                          seatNumber = 3 + seatIndex;
                        } else if (rowIndex === 3) {
                          seatNumber = seatIndex + 2;
                        } else {
                          seatNumber = seatIndex + 1;
                        }
                        const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                        return (
                          <div
                            className="seat"
                            key={seatIndex}
                            
                            onClick={() => handleSeatClick(1, rowIndex + 1, seatNumber)}
                          ></div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>

            {/* 2층 B구역 */}

            <div className="M-Area-Center-2">
                <p className="C-Area-Center-Tag">[B]</p>
                {Array.from({ length: 9 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from(
                       { length: rowIndex === 0 ? 17 : rowIndex === 1 ? 18 : rowIndex < 4 ? 19 : rowIndex < 6 ? 20 : rowIndex === 6 ? 21 : rowIndex === 8 ? 13 : 22 },
                      (_, seatIndex) => {
                        let seatNumber;
                        if (rowIndex < 3) {
                          seatNumber = 3 + seatIndex;
                        } else if (rowIndex === 3) {
                          seatNumber = seatIndex + 2;
                        } else {
                          seatNumber = seatIndex + 1;
                        }
                        const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                        return (
                          <div
                            className="seat"
                            key={seatIndex}
                            
                            onClick={() => handleSeatClick(1, rowIndex + 1, seatNumber)}
                          ></div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>

            { /* 2층 C구역 */}

            <div className="M-Area-Right-2">
                <p className="C-Area-left-Tag">[C]</p>
                {Array.from({ length: 8 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from(
                      { length: rowIndex < 3 ? 12 : rowIndex < 7 ? 11 : 10 },
                      (_, seatIndex) => {
                        let seatNumber;
                        if (rowIndex < 3) {
                          seatNumber = 3 + seatIndex;
                        } else if (rowIndex === 3) {
                          seatNumber = seatIndex + 2;
                        } else {
                          seatNumber = seatIndex + 1;
                        }
                        const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                        return (
                          <div
                            className="seat"
                            key={seatIndex}
                            
                            onClick={() => handleSeatClick(1, rowIndex + 1, seatNumber)}
                          ></div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>
        )}

        </div>
    )
}

export default SeeyaSeatMasterCard;