import React, { useState } from "react";
import axios from "axios";
import Header from "../../Header";
import '../styles/SeeyaUpload.css';
import { Link } from 'react-router-dom';

function SeeyaUpload(props) {
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
        `http://43.200.58.174:8080/api/v1/view-review/${props.theaterId}/upload`,
        form
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="play"
          placeholder="연극 이름"
          value={form.play}
          onChange={handleChange}
        />
        <input
          type="text"
          name="seat"
          placeholder="좌석 정보"
          value={form.seat}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="내용"
          value={form.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}

export default SeeyaUpload;
