import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaReview.css';

function SeeyaReview() {

  const { theaterId, viewNo } = useParams();
  const [review, setReview] = useState({});
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

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


  const handleEditClick = () => {
    axios.post(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}/auth`, {}, {headers: {'X-AUTH-TOKEN': token}})
      .then((response) => {
        console.log(response.data);
        if (response.data === "SUCCESS") {
          navigate(`/seeyaedit/${theaterId}/${viewNo}`);
        } 
        else {
          console.log(response.data);
          alert("본인이 작성한 게시물만 수정할 수 있습니다");
        }
      }
      )
  }

  const handleDeleteClick = () => {
    axios.post(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}/auth`, {}, {headers: {'X-AUTH-TOKEN': token}})
      .then((response) => {
        if (response.data === "SUCCESS") {
          axios.delete(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`, {headers: {'X-AUTH-TOKEN': token}})
            .then((response) => {
              console.log(response.data);
              alert("게시물 삭제가 완료되었습니다!");
              navigate("/seeyamain");
            })
            .catch((error) => {
              console.log(error);
            })
        } 
        else {
          console.log(response.data);
        }
      });
  }

  return (
    <div>
      <Header />
      <div className="SeeyaReview-Container">
        <p className="SeeyaReview-Review">극장 시야 후기</p>
        <hr />

        <p className="SeeyaReview-title">"{review.title}"</p>
            <div className="SeeyaReview-Contents">
              <p className="SeeyaReview-content">{review.content}</p>
              <p className="SeeyaReview-nickName">닉네임 [ {review.nickName} ]</p>
            </div>

            <button className="SeeyaReview-modify" onClick={handleEditClick}>수정</button>
            <button className="SeeyaReview-delete" onClick={handleDeleteClick}>삭제</button>

      </div>
    </div>
  );
}

export default SeeyaReview;
