import React , { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatChungmu.css';

const SeeyaSeatChungmu = () => {
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

    const [activeTab, setActiveTab] = useState("C-Floor1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

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
                    {Array.from(
                      { length: rowIndex < 3 ? 7 : rowIndex === 3 ? 8 : 9 },
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
              </div>

                {/* 1층 B구역 */}

                <div className="C-Area-Center-1">
                 <p className="C-Area-Center-Tag">[B]</p>
                 {Array.from({ length: 20 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 17 : 16 },
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 10;
                    const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor: seatColor,
                        }}
                        onClick={() =>
                          handleSeatClick(1, rowIndex + 1, seatNumber)
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
                      let seatNumber;
                      if (rowIndex % 2 === 0) {
                        seatNumber = seatIndex % 2 === 0 ? 27 + seatIndex : 26 + seatIndex;
                      }
                      else {
                        seatNumber = seatIndex % 2 === 0 ? 26 + seatIndex : 27 + seatIndex;
                      }
                      const seatColor = getSeatColor(1, rowIndex+1, seatNumber);

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
          </div>
            </div>
         )}


         {activeTab === "C-Floor2" && (
            <div>
              <p className="SS-C-Title">충무아트센터 대극장 2층</p>
            {/* 2층 A구역 */}
            <div className="C-Area-left-2">
                <p className="C-Area-left-Tag">[A]</p>
                {Array.from({ length: 7 }, (_, rowIndex) => (
                  <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from(
                      { length: rowIndex < 6 ? 9 : rowIndex === 7 ? 4 : 4 },
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

                <div className="C-Area-Center-2">
                 <p className="C-Area-Center-Tag">[B]</p>
                 {Array.from({ length: 7 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 16 : 15 },
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 10;
                    const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        
                        onClick={() =>
                          handleSeatClick(1, rowIndex + 1, seatNumber)
                        }
                      ></div>
                    );
                  }
                )}
              </div>
            ))}

              {Array.from({ length: 4 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 11 : 12 },
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 10;
                    const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        style={{
                          
                        }}
                        onClick={() =>
                          handleSeatClick(1, rowIndex + 1, seatNumber)
                        }
                      ></div>
                    );
                  }
                )}
              </div>
            ))}
          </div>
                {/* 2층 C구역 */}


                <div className="C-Area-Right-2">
                <p className="C-Area-Right-Tag">[C]</p>
                {Array.from({ length: 6 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from({ length: 9}, (_, seatIndex) => {
                      let seatNumber;
                      if (rowIndex % 2 === 0) {
                        seatNumber = seatIndex % 2 === 0 ? 27 + seatIndex : 26 + seatIndex;
                      }
                      else {
                        seatNumber = seatIndex % 2 === 0 ? 26 + seatIndex : 27 + seatIndex;
                      }
                      const seatColor = getSeatColor(1, rowIndex+1, seatNumber);

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
            </div>
            </div>
         )}


         {activeTab ==="C-Floor3" && (
            <div>
            <p className="SS-C-Title">충무아트센터 대극장 3층</p>
                {/* 3층 A구역 */}
                <div className="C-Area-Left-3">
                <p className="C-Area-Right-Tag">[A]</p>
                {Array.from({ length: 8 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from({ length: 9}, (_, seatIndex) => {
                      let seatNumber;
                      if (rowIndex % 2 === 0) {
                        seatNumber = seatIndex % 2 === 0 ? 27 + seatIndex : 26 + seatIndex;
                      }
                      else {
                        seatNumber = seatIndex % 2 === 0 ? 26 + seatIndex : 27 + seatIndex;
                      }
                      const seatColor = getSeatColor(1, rowIndex+1, seatNumber);

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
            </div>
                
                {/* 3층 B구역 */}
                <div className="C-Area-Center-3">
                 <p className="C-Area-Center-Tag">[B]</p>
                 {Array.from({ length: 8 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 16 : 15 },
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 10;
                    const seatColor = getSeatColor(1, rowIndex+1, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        
                        onClick={() =>
                          handleSeatClick(1, rowIndex + 1, seatNumber)
                        }
                      ></div>
                    );
                  }
                )}
              </div>
            ))}
            </div>
                
                {/* 3층 C구역 */}

                <div className="C-Area-Right-3">
                <p className="C-Area-Right-Tag">[C]</p>
                {Array.from({ length: 8 }, (_, rowIndex) => (
                <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from({ length: 9}, (_, seatIndex) => {
                      let seatNumber;
                      if (rowIndex % 2 === 0) {
                        seatNumber = seatIndex % 2 === 0 ? 27 + seatIndex : 26 + seatIndex;
                      }
                      else {
                        seatNumber = seatIndex % 2 === 0 ? 26 + seatIndex : 27 + seatIndex;
                      }
                      const seatColor = getSeatColor(1, rowIndex+1, seatNumber);

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
            </div>



            </div>
         )}



        </div>
    )
}

    export default SeeyaSeatChungmu; 