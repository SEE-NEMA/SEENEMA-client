import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../Header'

const ReviewEdit = () => {
    const { postNo } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [postNo]);
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleContentChange = (event) => {
      setContent(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      axios
        .put(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`, {
          title,
          content,
        })
        .then(() => {
          navigate(`/review/${postNo}`);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    return (
      <div>
        <Header />
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              name="content"
              value={content}
              onChange={handleContentChange}
            ></textarea>
          </div>
          <button type="submit">수정 완료</button>
        </form>
      </div>
    );
  };
  
  export default ReviewEdit;
  