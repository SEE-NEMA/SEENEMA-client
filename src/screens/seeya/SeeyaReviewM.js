import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderM from "../../HeaderM";
import '../styles/SeeyaReview.css';
import {AiOutlineQuestionCircle} from "react-icons/ai"
import { FaHeart } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";


function SeeyaReview() {

  const {theaterId, viewNo } = useParams();
  const [review, setReview] = useState({});
  const [viewScore, setViewScore] = useState("");
  const [seatScore, setSeatScore] = useState("");
  const [lightScore,setLightScore] = useState("");
  const [soundScore, setSoundScore] = useState("");
  const [averageScore, setAverageScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [heartCount, setHeartCount] = useState(0);
  const [heartedYN, setHeartedYN] = useState(false);

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

        setHeartedYN(response.data.heartedYN);
        setHeartCount(response.data.heartCount);

        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId, viewNo, token]);

  useEffect(() => {
    setHeartCount(review.heartCount);
    setHeartedYN(review.heartedYN);
  }, [review]);

  const handleHeartClick = () => {
    axios
      .post('http://43.200.58.174:8080/api/v1/view-review/auth', {}, { headers: { 'X-AUTH-TOKEN': token } })
      .then((response) => {
        if (response.data === 'SUCCESS') {
          if (heartedYN) {
            axios
              .delete(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}/heart`, {
                headers: { 'X-AUTH-TOKEN': token },
              })
              .then((response) => {
                console.log(response.data);
                setHeartCount(response.data.heartCount);
                setHeartedYN(false);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            axios
              .post(
                `http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}/heart`,
                {},
                { headers: { 'X-AUTH-TOKEN': token } }
              )
              .then((response) => {
                console.log(response.data);
                setHeartCount(response.data.heartCount);
                setHeartedYN(response.data.heartedYN);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          console.log(response.data);
          // 실패 시 처리할 로직 추가
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


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
      <HeaderM/>
      <div className="seeya-review-container">
        <div className="view-review-title"><span>{review.title}</span></div>
          <p className="view-review-nickName">    작성자 : {review.nickName}</p>        
          <p className="view-review-nickName">    <FaStar/>  평균별점 : {averageScore}    <AiOutlineQuestionCircle/></p>
          <p className="view-review-nickName">    <FaHeart/>  좋아요 수 : {heartCount}</p>
        <div className="view-review-content">{review.content}</div>
      </div>
    </div>
  );
}

export default SeeyaReview;
