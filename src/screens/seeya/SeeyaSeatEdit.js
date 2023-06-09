import React, { useState } from "react";
import { useParams, useNavigate  } from 'react-router-dom';
import axios from "axios";
import Header from '../../Header';
import '../styles/SeeyaSeatEdit.css';
import { FaStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const SeeyaSeatEdit = () => {
const location = useLocation();
const [content, setContent] = useState(location.state?.content || "");
const [play, setPlay] = useState(location.state?.play || "");
const [title, setTitle] = useState(location.state?.title || "");
const [viewScore, setViewScore] = useState(location.state?.viewScore || 0);
const [seatScore, setSeatScore] = useState(location.state?.seatScore || 0);
const [lightScore, setLightScore] = useState(location.state?.lightScore || 0);
const [soundScore, setSoundScore] = useState(location.state?.soundScore || 0);
const [images, setImages] = useState(location.state?.images || null);
  const token = localStorage.getItem("token");
  const { theaterId, x, y, z, viewNo } = useParams();
  const navigate = useNavigate();

  const StarRating = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
      <div className="star-rating">
        {stars.map((star) => (
          <FaStar
            key={star}
            className={star <= value ? "star-icon active" : "star-icon"}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  const handleViewScoreChange = (value) => {
    setViewScore(value.toString());
  };

  const handleSeatScoreChange = (value) => {
    setSeatScore(value.toString());
  };

  const handleLightScoreChange = (value) => {
    setLightScore(value.toString());
  };

  const handleSoundScoreChange = (value) => {
    setSoundScore(value.toString());
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("play", play);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("viewScore", viewScore);
      formData.append("seatScore", seatScore);
      formData.append("lightScore", lightScore);
      formData.append("soundScore", soundScore);
      formData.append("images", images);

      const response = await axios.put(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}/${viewNo}`,
        formData,
        {
          headers: {
            "X-AUTH-TOKEN": token
          },
        }
      );

      console.log(response.data);
      navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
      alert("게시물 수정이 완료되었습니다!");
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <div>
        <Header/>

            <div className="SeeyaSeatEdit-ContentWrap">

            <form onSubmit={handleEditSubmit}>
            
            <label>제목</label>
            <input
            className = "SeeyaSeatEdit-Play"
            type="text"
            value={play}
            onChange={(e) => setPlay(e.target.value)}
            />

            <br />

            <label>공연</label>
            <input
            className = "SeeyaSeatEdit-Play"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />


            <textarea
            className = "SeeyaSeatEdit-Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <br />

            <label htmlFor="title" className="SeeyaSeatEdit-StarRating-Label">
              시야평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(viewScore)} onChange={handleViewScoreChange} />
            </span>

            <br />

            <label htmlFor="title" className="SeeyaSeatEdit-StarRating-Label">
              좌석평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(seatScore)} onChange={handleViewScoreChange} />
            </span>

            <br />

            <label htmlFor="title" className="SeeyaSeatEdit-StarRating-Label">
              조명평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(lightScore)} onChange={handleLightScoreChange} />
            </span>

            <br />

            <label htmlFor="title" className="SeeyaSeatEdit-StarRating-Label">
              음향평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(soundScore)} onChange={handleSoundScoreChange} />
            </span>

            <br />

            <label className="SeeyaSeatEdit-Image-Label">사진:</label>
            <input
            className="SeeyaSeatEdit-Image"
            type="file"
            onChange={(e) => setImages(e.target.files[0])}
            />

            <button className="SeeyaSeatEdit-Button" type="submit">수정하기</button>
        </form>
        </div>
        </div>
  );
}

export default SeeyaSeatEdit;
