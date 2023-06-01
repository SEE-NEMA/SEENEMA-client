import React , { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeatChungmu.css';
import { IoIosArrowBack } from 'react-icons/io'

const SeeyaSeatChungmu = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {theaterId} = useParams();
  const [seatColors, setSeatColors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({z:null, x:null, y:null})

  const handleGoBack = () => {
    navigate(`/seeyaseatmain`);
  };


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
          `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`, {
            headers : {
              "X-AUTH-TOKEN" : token
            }
          }
        );
        console.log(z + '층' + x + '열' + y + '번');
        setModalData({z, x, y});
        setIsModalOpen(true);
        if(response.data === "not_enough_token") {
          alert("남은 포인트 부족");
          return '';
        }
        //navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
      } catch (error) {
        console.error(error);
      }
    };

    const handleYesButtonClick = () => {
      const {z, x, y} = modalData
      try {
        const response = axios.get (
          `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
        );
        navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
      }
      catch (error) {
        console.error(error);
      }
    };
  
    const handleNoButtonClick = () => {
      setIsModalOpen(false);
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
         <button className="back-button2" onClick={handleGoBack}>
        <IoIosArrowBack size="30"/> 
      </button>

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
                          ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
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
                      ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
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
        const seatNumber = rowIndex % 2 === 0 ? seatIndex + 27 : seatIndex + 26;
        const seatColor = getSeatColor(1, rowIndex + 1, seatNumber);

        return (
          <div
            className="seat"
            key={seatIndex}
            style={{
              backgroundColor: seatColor,
            }}
            onClick={() => handleSeatClick(1, rowIndex + 1, seatNumber)}
          >
            <h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10>
          </div>
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
                {Array.from({ length: 7 }, (_, rowIndex) => {
                  return (
                  <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                    {Array.from(
                      { length: rowIndex < 6 ? 9 : rowIndex === 7 ? 4 : 4 },
                      (_, seatIndex) => {
                        let seatNumber;
                        if (rowIndex < 6) {
                          seatNumber = 2 + seatIndex;
                        } else if (rowIndex === 6) {
                          seatNumber = seatIndex + 7;
                        }
                        const seatColor = getSeatColor(2, rowIndex+1, seatNumber);
                        return (
                          <div
                            className="seat"
                            key={seatIndex}
                            style={{
                              backgroundColor: seatColor,
                          }}
                            onClick={() => handleSeatClick(2, rowIndex + 1, seatNumber)}
                          ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
                        );
                      }
                    )}
                  </div>
                  )
              })}
              </div>

                {/* 2층 B구역 */}

                <div className="C-Area-Center-2">
                 <p className="C-Area-Center-Tag">[B]</p>
                 {Array.from({ length: 8 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: rowIndex % 2 === 0 ? 16 : 15 },
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 11;
                    const seatColor = getSeatColor(2, rowIndex+1, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor: seatColor,
                      }}
                        onClick={() =>
                          handleSeatClick(2, rowIndex + 1, seatNumber)
                        }
                      ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
                    );
                  }
                )}
              </div>
            ))}

              {Array.from({ length: 2 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: 11},
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 10;
                    const seatColor = getSeatColor(2, rowIndex+9, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor : seatColor
                        }}
                        onClick={() =>
                          handleSeatClick(2, rowIndex + 9, seatNumber)
                        }
                      ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
                    );
                  }
                )}
              </div>
            ))}

            {Array.from({ length: 1 }, (_, rowIndex) => (
              <div className={`row-${rowIndex + 1}`} key={rowIndex}>
                {Array.from(
                  { length: 8},
                  (_, seatIndex) => {
                    const seatNumber = seatIndex + 11;
                    const seatColor = getSeatColor(2, rowIndex+11, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor : seatColor
                        }}
                        onClick={() =>
                          handleSeatClick(2, rowIndex + 11, seatNumber)
                        }
                      ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
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
      {Array.from({ length: 9 }, (_, seatIndex) => {
        const seatNumber = rowIndex % 2 === 0 ? seatIndex + 27 : seatIndex + 26;
        const seatColor = getSeatColor(2, rowIndex + 1, seatNumber);

        return (
          <div
            className="seat"
            key={seatIndex}
            style={{
              backgroundColor: seatColor,
            }}
            onClick={() => handleSeatClick(2, rowIndex + 1, seatNumber)}
          >
            <h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10>
          </div>
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
                      let seatNumber = seatIndex + 2;
                      const seatColor = getSeatColor(3, rowIndex+1, seatNumber);

                    return (
                        <div
                        className="seat"
                        key={seatIndex}
                        style={{
                            backgroundColor: seatColor,
                        }}
                        onClick={() => handleSeatClick(3, rowIndex + 1, seatNumber)}
                        ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
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
                    const seatNumber = seatIndex + 11;
                    const seatColor = getSeatColor(3, rowIndex+1, seatNumber);
                    return (
                      <div
                        className="seat"
                        key={seatIndex}
                        style={{
                          backgroundColor: seatColor,
                      }}
                        onClick={() =>
                          handleSeatClick(3, rowIndex + 1, seatNumber)
                        }
                      ><h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10></div>
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
      {Array.from({ length: 9 }, (_, seatIndex) => {
        let seatNumber;
        if (rowIndex % 2 === 0) {
          seatNumber = seatIndex + 27;
        } else {
          seatNumber = seatIndex + 26;
        }
        const seatColor = getSeatColor(3, rowIndex + 1, seatNumber);

        return (
          <div
            className="seat"
            key={seatIndex}
            style={{
              backgroundColor: seatColor,
            }}
            onClick={() => handleSeatClick(3, rowIndex + 1, seatNumber)}
          >
            <h10 style={{color : '#595959'}}>&nbsp;{seatNumber}</h10>
          </div>
        );
      })}
    </div>
  ))}
</div>




            </div>
         )}

        {isModalOpen && (
          <div className='seeyaseat-reward-alert'>
            좌석 리뷰를 보기 위해 리워드가 차감됩니다.
            <button onClick={handleYesButtonClick}>네
            </button>
            <button onClick={handleNoButtonClick}>아니오</button>
          </div>
        )}

        </div>
    )
}

    export default SeeyaSeatChungmu; 