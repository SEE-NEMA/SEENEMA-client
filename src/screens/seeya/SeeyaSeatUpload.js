import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";
import '../styles/SeeyaSeatUpload.css';
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

const SeeyaSeatUpload = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { theaterId, x, y, z, viewNo } = useParams();
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
    const [images, setImages] = useState([null]);
   
    const renderStarScore = (score, setStars) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FaStar
              key={i}
              style={{ color: i <= score ? 'yellow' : 'lightgray' }}
              onClick={() => setStars(i)}
            />
          );
        }
        return stars;
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
            console.log(formData);
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
                console.log(viewNo);
                handleReviewModalClose();
                navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
                const newReview = {
                  viewScore: viewScore,
                  seatScore: seatScore,
                  lightScore: lightScore,
                  soundScore: soundScore,
                };
                setModalData((prevData) => ({
                  ...prevData,
                  ...newReview,
                }));
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

    return (
        <div >
            <Header/>

            <div className="center">
                <div className="SS-Ticket-Link">
                    <Link to={`/seeyaseatticket/${theaterId}/${z}/${x}/${y}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;티켓 인증하기 <br/> (인증 시 포인트 지급)</Link>
                </div>
                <div className="SS-Review-Write-Link">
                    <button onClick={handleReviewModalOpen}>리뷰 작성하기</button>
                </div>

                {isReviewModalOpen && (
            <div className="SeeyaSeat-modal">
            <div className="SeeyaSeat-modal-content">
              <h3 className = "SS-Modal-Edit-Title">리뷰 작성</h3>

              <form>
              <label>제목 : </label>
              <input
                className="SS-Modal-Edit-Content"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 작성해주세요."
              />
              </form>

              <form>
              <label>공연 : </label>
              <input
                className="SS-Modal-Edit-Content"
                value={play}
                onChange={(e) => setPlay(e.target.value)}
                placeholder="공연 이름을 작성해주세요."
              />
              </form>

              <form>
              <textarea
                className="SS-Modal-Edit-Review"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              </form>
              <br/>
              
              <form>
              <label>사진 : </label>
              <input
                className = "SS-Modal-Edit-Image"
                type="file"
                onChange={setImages}
              />
              </form>

              <div className = "SS-Modal-Edit-StarRating">
              <div className = "SS-Modal-Edit-Star">
                <label>시야평점 : </label>
                {renderStarScore(viewScore, setViewScore)}
              </div>
              <div className = "SS-Modal-Edit-Star">
                <label>좌석평점 : </label>
                {renderStarScore(seatScore, setSeatScore)}
              </div>
              <div className = "SS-Modal-Edit-Star">
                <label>조명평점 : </label>
                {renderStarScore(lightScore, setLightScore)}
              </div>
              <div className = "SS-Modal-Edit-Star">
                <label>음향평점 : </label>
                {renderStarScore(soundScore, setSoundScore)}
              </div>

              <button className = "SS-Modal-Edit-Modify" onClick={handleReviewSubmit}>작성</button>
              <button className = "SS-Modal-Edit-Cancel" onClick={handleReviewModalClose}>취소</button>
            </div>
            </div>
          </div>
        )}
                

            </div>
        </div>
    );
};

export default SeeyaSeatUpload;



