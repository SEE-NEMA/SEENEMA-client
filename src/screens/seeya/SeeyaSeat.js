import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import '../styles/SeeyaSeat.css';
import { TbDisabled } from 'react-icons/tb';

const SeeyaSeat = () => {
  const { theaterId } = useParams();
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({ z: 0, x: 0, y: 0 });

  const handleSeatClick = async (x, y, z) => {
    try {
      const response = await axios.get(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
      );
      setModalData(response.data);
      setSelectedSeat({ z, x, y });
      setIsModalOpen(true);
      console.log(response.data);
      console.log(z, x, y);
    } catch (error) {
      console.error(error);
      alert(z+"층" + x+"열"+ y+"번"+" 좌석에 리뷰가 등록되어 있지 않습니다");
    }
  };

  const ModalContent = () => {
    return (
      <div className="SeeyaSeat-modal-content">
        {modalData.map((item) => (
          <div key={item.viewNo}>
            <p>{selectedSeat.z}층 {selectedSeat.x}열 {selectedSeat.z}번</p>
            <p>닉네임 : {item.nickName}</p>
            <p>제목 : {item.title}</p>
            <p>작성일자 : {item.createdAt}</p>
            <p>좋아요 수 : {item.heartCount}</p>
            <p>시야평점 : {item.viewScore}</p>
            <hr />
          </div>
        ))}
        <button onClick={handleModalClose}>닫기</button>
      </div>
    );
  };

  const handleModalClose = () => {
    setModalData([]);
    setSelectedSeat({ z: 0, x: 0, y: 0 });
    setIsModalOpen(false);
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
                  // y, x, z
                  onClick={() => handleSeatClick(rowIndex+1, seatIndex + 1, 1)}
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
                  onClick={() => handleSeatClick(1, rowIndex + 1, seatIndex + 9)}
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

      {/* 모달 */}
      {isModalOpen && (
        <div className="SeeyaSeat-modal">
          <ModalContent />
        </div>
      )}
    </div>
  );
};

export default SeeyaSeat;