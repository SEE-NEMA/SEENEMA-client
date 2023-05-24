import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";
import modal from "modal";
import '../styles/SeeyaSeatList.css';
import { FaStar } from 'react-icons/fa';

const SeeyaSeatList = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { theaterId, x, y, z } = useParams();
  const [selectedSeat, setSelectedSeat] = useState({ z: parseInt(z), x: parseInt(x), y: parseInt(y) });
  const [modalData, setModalData] = useState(null);
  const [seatReviews, setSeatReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [play, setPlay] = useState("");
  const [title, setTitle] = useState("");
  const [viewScore, setViewScore] = useState(0);
  const [seatScore, setSeatScore] = useState(0);
  const [lightScore, setLightScore] = useState(0);
  const [soundScore, setSoundScore] = useState(0);
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [itemsPerPage, setItemsPerPage] = useState(5); // 페이지 당 아이템 수
  
  const getPaginatedReviews = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return seatReviews.slice(startIndex, endIndex);
  };

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}`
      );
      setSelectedSeat({ z: parseInt(z), x: parseInt(x), y: parseInt(y) });
      setSeatReviews(response.data.postingList); // Update the state with the postingList array
      console.log(seatReviews);
      console.log(z + "층" + x + "열" + y + "번");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [theaterId, x, y, z]);

  const handleSeatClick = async (review) => {
    // 해당 리스트 클릭하면 모달창에 해당 리뷰 띄우기
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

  const handleReviewModalOpen = () => {
    setIsReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("images", images);
      formData.append("play", play);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("viewScore", viewScore);
      formData.append("seatScore", seatScore);
      formData.append("lightScore", lightScore);
      formData.append("soundScore", soundScore);

      axios
      .post(`http://43.200.58.174:8080/api/v1/seats/auth`, {}, {
        headers : {
          "X-AUTH-TOKEN" : token
        }
      })
      .then((response) => {
        console.log(response.data);
        if(response.data === "SUCCESS")
        {
          axios.post(`http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}/upload`, 
          formData, {
            headers: {
              "Content-Type" : "multipart/form-data",
              "X-AUTH-TOKEN" : token
            }
          })
          .then((response) => {
            console.log(response.data);
            handleReviewModalClose();
            navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function Span({ space = 15 }){
    return (
        <span style={{ paddingRight: space }}></span>
      );
  }

  const renderStars = (score) => {
    const filledStars = Math.floor(score);
  
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<FaStar key={i} style={{ color: 'yellow' }} />);
      } else {
        stars.push(<FaStar key={i} style={{ color: 'lightgray' }} />);
      }
    }
  
    return stars;
  };


  return (
    <div>
      <Header />
      <div>
        <p className = "SeeyaSeatList-Seat">" {selectedSeat.z}층 {selectedSeat.x}열 {selectedSeat.y}번 "</p>
        <hr className = "SeeyaSeatList-hr"></hr>
        <button className = "SeeyaSeatReview-button" onClick={handleReviewModalOpen}>리뷰 작성하기</button>
        {seatReviews.length === 0 ? (
          <div className = "Review-None">등록된 리뷰가 없습니다. </div>
        ) : (
          <div className = "List-Wrap">
          <ul>
        {getPaginatedReviews().map((review) => (
          <li className="SeeyaSeatList-Wrap" key={review.viewNo}>
            <button onClick={() => handleSeatClick(review)}>
              제목 : {review.title}<Span></Span>닉네임 : {review.nickName}
            </button>
            <p className="SeeyaSeatList-nickname"></p>
            <p className="SeeyaSeatList-created">
              닉네임: {review.nickName}
              <Span></Span>
              작성일자: {review.createdAt}
            </p>
           
          </li>
        ))}
      </ul>
      </div>
    )}

        {seatReviews.length > itemsPerPage && (
          <div  style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            {Array.from({ length: Math.ceil(seatReviews.length / itemsPerPage) }, (_, index) => (
              <button className = "SeeyaSeatList-Page" key={index} onClick={() => changePage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
    


        {isModalOpen && modalData && (
          <div className="SeeyaSeat-modal">
            <div className="SeeyaSeat-modal-content">
              <p className = "SS-Modal-Seat">{selectedSeat.z}층 {selectedSeat.x}열 {selectedSeat.y}번</p>
              <p className = "SS-Modal-Info">닉네임: {modalData.nickName}<Span></Span>작성일자: {modalData.createAt}</p>
             
             <div className = "SS-Modal-Content">
              <p>공연 : {modalData.play}</p>
              <p>제목: {modalData.title}</p>
              <p>좋아요 수: {modalData.heartCount}</p>
              <p>내용 : {modalData.content}</p>
              </div>

              <div className="star-rating">
              <p>시야평점 : </p>
              {renderStars(modalData.viewScore)}
              </div>
              <div className="star-rating">
              <p>좌석평점 : </p>
              {renderStars(modalData.seatScore)}
              </div>
              <div className="star-rating">
              <p>조명평점 : </p>
              {renderStars(modalData.lightScore)}
              </div>
              <div className="star-rating">
              <p>음향평점 : </p>
              {renderStars(modalData.soundScore)}
              </div>
              <button className = "SS-Modal-button" onClick={handleModalClose}>닫기</button>
            </div>
          </div>
        )}


        {isReviewModalOpen && (
          <div className="SeeyaSeat-modal">
            <div className="SeeyaSeat-modal-content">
              <h3 className = "SS-Modal-Edit-Title">리뷰 작성</h3>
              리뷰 : <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="리뷰를 작성해주세요."
              />
              <br/>
              제목 : <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="리뷰를 작성해주세요."
              />
              <br/>
              공연 : <textarea
                value={play}
                onChange={(e) => setPlay(e.target.value)}
                placeholder="공연을 작성해주세요."
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImages(e.target.files[0])}
              />
              <div>
                <label>시야평점 : </label>
                <input
                  type="number"
                  value={viewScore}
                  onChange={(e) => setViewScore(e.target.value)}
                />
              </div>
              <div>
                <label>좌석평점:</label>
                <input
                  type="number"
                  value={seatScore}
                  onChange={(e) => setSeatScore(e.target.value)}
                />
              </div>
              <div>
                <label>조명평점:</label>
                <input
                  type="number"
                  value={lightScore}
                  onChange={(e) => setLightScore(e.target.value)}
                />
              </div>
              <div>
                <label>음향평점:</label>
                <input
                  type="number"
                  value={soundScore}
                  onChange={(e) => setSoundScore(e.target.value)}
                />
              </div>
              <button onClick={handleReviewSubmit}>작성</button>
              <button onClick={handleReviewModalClose}>취소</button>
            </div>
          </div>
        )}
        {/* 추가한 리뷰 작성 버튼 */}
        
      </div>
    </div>
  );
};

export default SeeyaSeatList;