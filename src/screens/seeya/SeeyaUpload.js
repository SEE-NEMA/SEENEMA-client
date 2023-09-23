import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../../Header";
import '../styles/SeeyaUpload.css';
import { useNavigate, useParams} from 'react-router-dom';
import { FaStar } from "react-icons/fa";



function SeeyaUpload() {


    const [play, setPlay] = useState("");
    const [seat, setSeat] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const [viewScore, setViewScore] = useState("");
    const [seatScore, setSeatScore] = useState("");
    const [lightScore, setLightScore] = useState("");
    const [soundScore, setSoundScore] = useState("");   
    
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

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const { theaterId } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("play", play);
        formData.append("seat", seat);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("images", image);

        formData.append("viewScore", viewScore);
        formData.append("seatScore", seatScore);
        formData.append("lightScore", lightScore);
        formData.append("soundScore", soundScore);

       
      

        axios.post(
            `http://43.200.58.174:8080/api/v1/view-review/${theaterId}/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                "X-AUTH-TOKEN" : token
              }
            }
          )
          .then((response) => {
            console.log(response.data);
            navigate(`/view-review/${theaterId}`);
          })
          .catch((error) => {
            console.log(error);
          });
    };
    
      const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
    

    return (
      <div>
        <Header/>
        <div className="SeeyaUpload-container">
          <form onSubmit={handleSubmit} className = "SeeyaUpload-form">
            <label htmlFor="play"className="SeeyaUpload-label">공연</label>
            <input 
              className="SeeyaUpload-play"
              placeholder="공연명을 입력해주세요"
              type="text" 
              value={play} 
              onChange={(event) => setPlay(event.target.value)} 
            />
            
            <p></p>
            
            <label htmlFor="seat"className="SeeyaUpload-label" >좌석</label>
            <input 
              className="SeeyaUpload-play"
              placeholder="좌석을 입력해주세요"
              type="text"
              value={seat}
              onChange={(event) => setSeat(event.target.value)}
            />
            
            <p></p>
            
            <label htmlFor="title" className="SeeyaUpload-label">제목</label>
            <input 
              className="SeeyaUpload-play"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="공연명 + 좌석 정보"
            />
            
            <p></p>
            
            <textarea 
              className="SeeyaUpload-play"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            
           
            
            <label htmlFor="image" className="SeeyaUpload-Image-label">사진</label>
            <input 
              className="SeeyaUpload-Image"
              type="file"
              onChange={handleImageChange}
            />
            
            <p></p>

            {/* 별점 리스트 */}

            <div>
            <label htmlFor="title" className="StarRating-label">
              시야평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(viewScore)} onChange={handleViewScoreChange} />
            </span>
            </div>

            <p></p>

            <div>
            <label htmlFor="title" className="StarRating-label">
              좌석평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(seatScore)} onChange={handleSeatScoreChange} />
            </span>
            </div>

            <p></p>

            <div>
            <label htmlFor="title" className="StarRating-label">
              조명평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(lightScore)} onChange={handleLightScoreChange} />
            </span>
            </div>

            <p></p>

            <div>
            <label htmlFor="title" className="StarRating-label">
              음향평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(soundScore)} onChange={handleSoundScoreChange} />
            </span>
            </div>

            {/* 별점 리스트 끝 */}


            <button type="submit">작성 완료</button>
          </form>
        </div>
      </div>
    );
}

export default SeeyaUpload;
