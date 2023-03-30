import React, { useState } from "react";
import axios from "axios";
import Header from "../../Header";
import '../styles/SeeyaUpload.css';
import { useParams } from 'react-router-dom';

function SeeyaUpload(props) {


  const { theaterId } = useParams();

  const [form, setForm] = useState({
    play: "",
    seat: "",
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://43.200.58.174:8080/api/v1/view-review/${theaterId}/upload`,
        form
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div className="SeeyaUpload-container">
        <Header/>

        <form onSubmit={handleSubmit} className = "SeeyaUpload-form">

            <label htmlFor="play"className="SeeyaUpload-label">극장</label>
            <input className = "SeeyaUpload-play"
            type="text"
            name="play"
            placeholder="극장 이름을 입력해주세요"
            value={form.play}
            onChange={handleChange}
            />

            <p></p>

            <label htmlFor="play"className="SeeyaUpload-label" >좌석</label>
            <input className = "SeeyaUpload-play"
            type="text"
            name="seat"
            placeholder="좌석 정보를 입력해주세요"
            value={form.seat}
            onChange={handleChange}
            />

            <p></p>

            <label htmlFor="play" className="SeeyaUpload-label">제목</label>
            <input className = "SeeyaUpload-play"
            type="text"
            name="title"
            placeholder="극 이름을 입력해주세요"
            value={form.title}
            onChange={handleChange}
            />

            <p></p>

           
            <textarea className = "SeeyaUpload-play"
            name="content"
           
            value={form.content}
            onChange={handleChange}
            ></textarea>
            <button type="submit">작성 완료</button>

      </form>
      </div>
    </div>
  );
}

export default SeeyaUpload;
