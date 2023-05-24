import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeat.css';
import { TbDisabled } from 'react-icons/tb';

const SeeyaSeat = () => {
  const navigate = useNavigate();
  const {theaterId, x, y, z} = useParams();
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({ z: 0, x: 0, y: 0 });
  const [average, setAverage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
        );
        // {theaterId} 여기에 average 띄워 줘야 좌석에 색깔 넣기 가능 
        setAverage(response.data.average);
        console.log(average);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [theaterId, x, y, z]);

  const handleSeatClick = async (x, y, z) => {
    // 해당 좌석 누르면 좌석 상세 페이지로 넘어간 뒤 후기 목록 열람 가능
    try {
      const response = await axios.get(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
      );
      setModalData(response.data);
      setSelectedSeat({ z, x, y });
      console.log(z + "층" + x + "열" + y + "번");
      navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
    } catch (error) {
      console.error(error);
      alert(z + "층" + x + "열" + y + "번 좌석에 리뷰가 등록되어 있지 않습니다");
    }
  };

  const getSeatColor = (average) => {
    if (average === 1) {
      return "red";
    } else if (average === 2) {
      return "orange";
    } else if (average === 3) {
      return "yellow";
    } else if (average === 4) {
      return "lime";
    } else if (average === 5) {
      return "green";
    } else {
      return ""; // 기본 색상
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
              {Array.from({ length: 9 }, (_, seatIndex) => (
                <div
                  className="seat"
                  key={seatIndex}
                  style={{
                    backgroundColor: getSeatColor(
                      modalData.average || selectedSeat.z === rowIndex + 1 && selectedSeat.x === seatIndex + 1 && selectedSeat.y === 1
                    )
                  }}
                  onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1, 1)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        {/* [나] 구역 끝 */}

        {/* [가] 구역 */}
        <div className="seatmapA">
          <p className="seetmapA-tag">[가]</p>
          {/* 6행으로 구성, 마지막 행은 좌석 10개 */}
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <div className={`row-${rowIndex + 1}`} key={rowIndex}>
              {Array.from({ length: 9 }, (_, seatIndex) => (
                <div
                  className="seat"
                  key={seatIndex}
                  style={{
                    backgroundColor: getSeatColor(
                      modalData.average || selectedSeat.z === rowIndex + 1 && selectedSeat.x === seatIndex + 10 && selectedSeat.y === 1
                    )
                  }}
                  onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 10, 1)}
                ></div>
              ))}
            </div>
          ))}
          <div className="row-last">
            {Array.from({ length: 10 }, (_, seatIndex) => (
              <div className="seat" key={seatIndex}></div>
            ))}
          </div>
        </div>
        {/* [가] 구역 끝 */}
      </div>
    </div>
  );
};

export default SeeyaSeat;
