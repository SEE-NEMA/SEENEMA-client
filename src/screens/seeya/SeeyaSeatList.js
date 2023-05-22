import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";

const SeeyaSeatList = () => {
  const { theaterId, x, y, z } = useParams();
  const [selectedSeat, setSelectedSeat] = useState({ z: parseInt(z), x: parseInt(x), y: parseInt(y) });
  const [modalData, setModalData] = useState(null);
  const [seatReviews, setSeatReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
        );
        setSelectedSeat({ z: parseInt(z), x: parseInt(x), y: parseInt(y) });
        setSeatReviews(response.data);
        console.log(z + "층" + x + "열" + y + "번");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [theaterId, x, y, z]);

  const handleSeatClick = async (review) => {
    try {
      const response = await axios.get(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}/${review.viewNo}`
      );
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div>
        <p>{selectedSeat.z}층 {selectedSeat.x}열 {selectedSeat.y}번</p>
        <hr/>
        {seatReviews.length === 0 ? (
          <div>등록된 리뷰가 없습니다. </div>
        ) : (
          <ul>
            {seatReviews.map((review) => (
              <li key={review.viewNo}>
                <button onClick={() => handleSeatClick(review)}>
                  {review.title}
                </button>
                <p>닉네임: {review.nickName}</p>
                <p>작성일자: {review.createdAt}</p>
                <hr />
              </li>
            ))}
          </ul>
        )}
        {isModalOpen && modalData && (
          <div className="SeeyaSeat-modal">
            <div className="SeeyaSeat-modal-content">
              <p>{selectedSeat.z}층 {selectedSeat.x}열 {selectedSeat.y}번</p>
              <p>닉네임: {modalData.nickName}</p>
              <p>제목: {modalData.title}</p>
              <p>작성일자: {modalData.createdAt}</p>
              <p>좋아요 수: {modalData.heartCount}</p>
              <p>{modalData.content}</p>
              <p>시야평점: {modalData.viewScore}</p>
              <p>좌석평점 : {modalData.seatScore}</p>
              <p>조명평점 : {modalData.lightScore}</p>
              <p>음향평점 : {modalData.soundScore}</p>
              <hr />
              <button onClick={handleModalClose}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeyaSeatList;
