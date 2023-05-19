import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaReview.css';

function SeeyaReview() {
  const { theaterId, viewNo } = useParams();
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [review, setReview] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    title: "",
    content: "",
    play: "",
    seat: "",
  });

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
      .then(response => {
        setReview(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId, viewNo]);

  const handleEditButton = () => {
    setIsEditing(true);
    setEditedReview({
      title: review.title,
      content: review.content,
      play: review.play,
      seat: review.seat,
    });
  };

  const handleCancelEditButton = () => {
    setIsEditing(false);
  };

  const handleSaveButton = () => {
    axios.put(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`, editedReview)
      .then(response => {
        console.log(response.data);
        setReview(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    setEditedReview({
      ...editedReview,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteButton = () => {
    axios.delete(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
      .then(response => {
        console.log(response.data);
        
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="SeeyaReview-Container">
        <p className="SeeyaReview-Review">극장 시야 후기</p>
        <hr />

        {!isEditing ? (
          <>
            <p className="SeeyaReview-title">"{review.title}"</p>
            <div className="SeeyaReview-Contents">
              <p className="SeeyaReview-content">{review.content}</p>
              <p className="SeeyaReview-nickName">닉네임 [ {review.nickName} ]</p>
            </div>
            <button onClick={handleEditButton} className = "SeeyaReview-modify">수정</button>
            <button onClick={handleDeleteButton} className = "SeeyaReview-delete">삭제</button>
          </>
        ) : (
          <div className = "Modify-Wrap">

            <label>제목</label>
            <input
              className = "Modify-title"
              type="text"
              name="title"
              value={editedReview.title}
              onChange={handleInputChange}
            />

            <label className = "Modify-label">극장</label>
            <input
              className = "Modify-play"
              type="text"
              name="play"
              value={editedReview.play}
              onChange={handleInputChange}
            />

            <label>좌석</label>
            <input
              className = "Modify-seat"
              type="text"
              name="seat"
              value={editedReview.seat}
              onChange={handleInputChange}
            />

             
             <textarea
               className = "Modify-content"
              name="content"
              value={editedReview.content}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveButton} className = "modify-save">저장</button>
            <button onClick={handleCancelEditButton} className = "modify-cancel">취소</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeeyaReview;
