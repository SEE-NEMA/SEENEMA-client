import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../Header'

const ReviewEdit = () => {
  const { postNo } = useParams();
  const [review, setReview] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`)
      .then((response) => {
        setReview(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postNo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedReview = {
      title: title,
      content: content,
      tags : [{tagId : 1}]
    };

    axios
      .put(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`, updatedReview)
      .then((response) => {
        console.log(response);
        navigate(`/review/${postNo}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
  <div>
    <Header/>
   
        <div className='ReviewWrite-ContentWrap'>

        <form onSubmit={handleSubmit}>
        <div className = 'RW-CW'>
            <label className = "ReviewWrite-Title">제목</label>
            <input className = 'ReviewWrite-Input' placeholder=' [ 공연장 이름 + 공연 ] 으로 작성해주세요.'
            name='title' value={title} onChange={(event) => setTitle(event.target.value)}
            ></input>
        </div>

        <p></p>

        <p></p>

        <div className='ReviewWrite-Content'>
            <label className = 'ReviewWrite-Label'>
            내용</label>
            <textarea className = 'ReviewWrite-Text' 
            name='content' value={content} onChange={(event)=>setContent(event.target.value)}
            ></textarea>
        </div>
       <button className = "ReviewWrite-Upload"  type="submit">수정</button>
        </form>

        <p></p>
       
        <div className="tag">
        <label className="ReviewWrite-Title">태그</label>
        <div className="tag_btns">
           <button className="tag_btn">맛집</button>
           <button className="tag_btn">주차장</button>
           <button className="tag_btn">대여</button>
           <button className="tag_btn">물품 보관소</button>
        </div>
        </div>
        </div>

    </div>
  );
};

export default ReviewEdit;