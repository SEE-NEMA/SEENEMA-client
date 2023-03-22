import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from '../../Header'
import "../styles/ReviewDetail.css"

const ReviewDetail = () => {
    const {postNo} = useParams();
    const [review, setReview] = useState({});
    const [content, setContent] = useState("");
    const [comments, setComments] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`)
        .then((response) => {
          setReview(response.data);
          setContent(response.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [postNo]);

    const handleEditClick = () => {
      navigate(`/reviewEdit/${postNo}`);
    }

    const handleDeleteClick = () => {
      axios.delete(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`)
      .then((response) => {
         console.log(response.data);
         navigate("/review")
      })
      .catch((error) => {
        console.log(error);
      })
    }

  

    return (
      <div>
        <Header/>
        <div className="RVDT-Wrap">
        <h2 className="RVDT-title">{review.title}</h2>
        <div className="RVDT-Detail">
            <h6 className="RVDT-nickname">작성자 : {review.nickName}</h6>
            <h6 className="RVDT-createdAt">작성 일자 : {review.createdAt}</h6>
            <h6 className="RVDT-viewCount">조회수 : {review.viewCount}</h6>
        </div>
        <p/>
        <div className="RVDT-content">{review.content}</div>
        <p>태그 : {review.tagId}</p>

        <div>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
        </div>
        <div>
    </div>
      </div>
      </div>
    );
  };
  // 들어가야 할것 : tagName, comments
  
  export default ReviewDetail;
