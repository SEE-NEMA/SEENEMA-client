import React, { useState } from "react";
import axios from "axios";
import Header from "../../Header";
import '../styles/SeeyaUpload.css';
import { useNavigate, useParams } from 'react-router-dom';

function SeeyaUpload() {

    const [play, setPlay] = useState("");
    const [seat, setSeat] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const { theaterId } = useParams();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("play", play);
        formData.append("seat", seat);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("images", image);
        
        axios
          .post(
            `http://43.200.58.174:8080/api/v1/view-review/${theaterId}/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then((response) => {
            console.log(response.data);
            navigate('/seeyamain');
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
            <label htmlFor="play"className="SeeyaUpload-label">극장</label>
            <input 
              className="SeeyaUpload-play"
              placeholder="극장 이름을 입력해주세요"
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
              placeholder="극장 이름 + 좌석 정보"
            />
            
            <p></p>
            
            <textarea 
              className="SeeyaUpload-play"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            
            <p></p>
            
            <label htmlFor="image" className="SeeyaUpload-label">사진</label>
            <input 
              className="SeeyaUpload-Image"
              type="file"
              onChange={handleImageChange}
            />
            
            <p></p>
            
            <button type="submit">작성 완료</button>
          </form>
        </div>
      </div>
    );
}

export default SeeyaUpload;
