import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Header";
import "../styles/SeeyaEdit.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const SeeyaEdit = () => {

    const { theaterId, viewNo } = useParams();

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


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [play, setPlay] = useState("");
    const [seat, setSeat] = useState("");
    const [viewScore, setViewScore] = useState("");
    const [seatScore, setSeatScore] = useState("");
    const [lightScore, setLightScore] = useState("");
    const [soundScore, setSoundScore] = useState("");

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

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
          .then((response) => {
            console.log(response.data);

            setTitle(response.data.title);
            setSeat(response.data.seat);
            setContent(response.data.content);
            setPlay(response.data.play);
            setViewScore(response.data.viewScore);
            setSeatScore(response.data.seatScore);
            setLightScore(response.data.lightScore);
            setSoundScore(response.data.soundScore);

            const urls = response.data.image.map((image) => image.imgUrl);
            setImages(urls);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [theaterId], [viewNo]);

      
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append('play', play);
        formData.append('seat', seat);
        formData.append('viewScore', viewScore);
        formData.append('seatScore', seatScore);
        formData.append('lightScore', lightScore);
        formData.append('soundScore', soundScore);
        
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]); 
        }

    axios
      .put(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "X-AUTH-TOKEN": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("게시물 수정이 완료되었습니다!");
        navigate("/seeyamain");
      })
      .catch((error) => {
        console.log(error);
      });
    };
   
    const handleImageChange = (event) => {
      setImages(event.target.files[0]);
    };

    return(
        <div>
        <Header/>
          <div className = "SeeyaEdit-Content-Wrap">

          <form onSubmit={handleSubmit}>

            <label className = "SeeyaEdit-label">제목</label>
            <input 
              className="SeeyaEdit-Input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              />

            <p></p>

            <label className = "SeeyaEdit-label">이름</label>
            <input
              className="SeeyaEdit-Input"
              value={play}
              onChange={(event) => setPlay(event.target.value)}
              />

            <p></p>

            <label className = "SeeyaEdit-label">좌석</label>
            <input
              className="SeeyaEdit-Input"
              value={seat}
              onChange={(event) => setSeat(event.target.value)}
            />

            <p></p>

            
            <textarea
              className="SeeyaEdit-Input-Content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              />

            <p></p>

            <label htmlFor="image" className="SeeyaUpload-Image-label">사진</label>
            <input 
              className="SeeyaUpload-Image"
              type="file"
              onChange={handleImageChange}
            />

            <div>
            <label htmlFor="title" className="SeeyaEdit-StarRating-label">
              시야평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(viewScore)} onChange={handleViewScoreChange} />
            </span>
            </div>

            <p></p>

            <div>
            <label htmlFor="title" className="SeeyaEdit-StarRating-label">
              좌석평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(seatScore)} onChange={handleSeatScoreChange} />
            </span>
            </div>

            <p></p>

            <div>
            <label htmlFor="title" className="SeeyaEdit-StarRating-label">
              조명평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(lightScore)} onChange={handleLightScoreChange} />
            </span>
            </div>

            <p></p>

            <div>
            <label htmlFor="title" className="SeeyaEdit-StarRating-label">
              음향평점
            </label>
            <span className="SeeyaUpload-rating">
              <StarRating value={parseInt(soundScore)} onChange={handleSoundScoreChange} />
            </span>
            </div>
            
            <button className="SeeyaEdit-Button" type="submit">
              수정
            </button>
            
          </form>
         </div>
        </div>
    );

};
    

export default SeeyaEdit;