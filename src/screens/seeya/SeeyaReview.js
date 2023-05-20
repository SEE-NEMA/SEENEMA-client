import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Header";
import '../styles/SeeyaReview.css';
import {AiOutlineQuestionCircle} from "react-icons/ai"
function SeeyaReview() {

  const { theaterId, viewNo } = useParams();
  const [review, setReview] = useState({});
  const [viewScore, setViewScore] = useState("");
  const [seatScore, setSeatScore] = useState("");
  const [lightScore,setLightScore] = useState("");
  const [soundScore, setSoundScore] = useState("");
  const [averageScore, setAverageScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
      .then(response => {
        setReview(response.data);
        setViewScore(response.data);
        setSeatScore(response.data);
        setLightScore(response.data);
        setSoundScore(response.data);
        
        const scores = [response.data.viewScore, response.data.seatScore, response.data.lightScore, response.data.soundScore];
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const average = totalScore / scores.length;
        setAverageScore(average.toFixed(1));

        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId, viewNo]);

  const handleHeartClick = () => {
    axios.post('http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}/heart', {}, {headers : {'X-AUTH-TOKEN' : token}})
    .then((response) => {
      console.log(response.data);
      if(response.data === "SUCCESS") {
        
      }
    })
  }



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
              <p className="Average-Score">평균별점 : {averageScore} 
              <AiOutlineQuestionCircle
              className = "Question-Score"
              onClick={toggleModal}
              />
                {showModal && (
                <div className="Question-Modal">
              <p className= "Question-text">시야, 좌석, 조명, 음향 평점의 평균값입니다.</p>
            </div>
          )} </p> 
              
              <p className="SeeyaReview-nickName">닉네임 [ {review.nickName} ]</p>
            </div>

            <button className="SeeyaReview-modify" onClick={handleEditClick}>수정</button>
            <button className="SeeyaReview-delete" onClick={handleDeleteClick}>삭제</button>

      </div>
    </div>
  );
}

export default SeeyaReview;
