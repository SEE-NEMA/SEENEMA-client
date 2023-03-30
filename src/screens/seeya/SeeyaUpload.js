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

    const { theaterId } = useParams();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const data = {
          play: play,
          seat: seat,
          title: title,
          content: content
        };
      
        axios
          .post(
            `http://43.200.58.174:8080/api/v1/view-review/${theaterId}/upload`,
            data
          )
          .then((response) => {
            console.log(response.data);
            navigate('/seeyamain');
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
  return (
    <div>
        <div className="SeeyaUpload-container">
        <Header/>

        <form onSubmit={handleSubmit} className = "SeeyaUpload-form">

            <label htmlFor="play"className="SeeyaUpload-label">극장</label>
            <input className = "SeeyaUpload-play"
            placeholder="극장 이름을 입력해주세요"
            type="text" 
            value={play} 
            onChange={(event) => setPlay(event.target.value)} />
            

            <p></p>

            <label htmlFor="seat"className="SeeyaUpload-label" >좌석</label>
            <input className = "SeeyaUpload-play"
            placeholder="좌석을 입력해주세요"
            type="text"
            value={seat}
            onChange={(event) => setSeat(event.target.value)}
            />

            <p></p>

            <label htmlFor="title" className="SeeyaUpload-label">제목</label>
            <input className = "SeeyaUpload-play"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="극장 이름 + 좌석 정보"
            
            />

            <p></p>

           
            <textarea className = "SeeyaUpload-play"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <button type="submit">작성 완료</button>

      </form>
      </div>
    </div>
  );
}

export default SeeyaUpload;
