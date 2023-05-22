import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaSeat.css';
import {TbDisabled} from 'react-icons/tb';

const SeeyaSeat = () => {
  const { theaterId } = useParams();
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({ x: 0, y: 0, z: 0 });
  
  const handleSeatClick = async (x, y, z) => {
    try {
      const response = await axios.get(`http://43.200.58.174:8080/api/v1/seats/${theaterId}/${x}/${y}/${z}`);
      setModalData(response.data);
      setSelectedSeat({ x, y, z });
      setIsModalOpen(true); 
    } catch (error) {
      console.error(error);
    }
  };
  
  const ModalContent = () => {
    return (
      <div className="SeeyaSeat-modal-content">
        {modalData.map((item) => (
          <div key={item.viewNo}>
            <p>{selectedSeat.y}층 {selectedSeat.x}열 {selectedSeat.z}번</p>
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
    setModalData({});
    setSelectedSeat({ x: 0, y: 0, z: 0 });
    setIsModalOpen(false); 
  };
  
  return (
    <div>
    <Header/>

    {/* 스테이지 */}

    <div className="Stage">
      Stage
    </div>

     


    {/* [1층] */}
    <div className="Floor-1">

    {/* [나] 구역 */}

    <div className="seatmapB">
      <p className = "seetmapB-tag">[나]</p>

     {/* 6행으로 구성, 마지막 행은 좌석 10개 */}

      <div className="row-1">
        <div className="seat-1" onClick={() => handleSeatClick(1, 1, 1)}></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row-2">
      <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row-3">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row-4">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row-5">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row-6">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      </div>
      {/* [나] 구역 끝 */}

      {/* [가] 구역 */}

      <div className="seatmapA">
      <p className = "seetmapA-tag">[가]</p>

      {/* 6행으로 구성, 마지막 행은 좌석 10개 */}

      <div className="row-A-First">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>

        <div className="disabled-seat-wrap"> </div>
        <div className="disabled-seat"> <TbDisabled size ="40"/></div>
        <div className="disabled-seat"> <TbDisabled size ="40"/> </div>
       

      </div>

      <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>

      <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>

      <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>

      <div className="row">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>

      <div className="lastrowA">
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
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