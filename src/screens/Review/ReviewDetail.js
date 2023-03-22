import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from '../../Header'
import "../styles/ReviewDetail.css"

const ReviewDetail = () => {
    const {postNo} = useParams();
    const {commentId} = useParams();
    const [review, setReview] = useState({});
    const [content, setContent] = useState("");
    const [comments, setComments] = useState("");
    const navigate = useNavigate();
    const [hoveredComment, setHoveredComment] = useState(null);
  
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

    const addComments = () => {
      axios
        .post(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/comment`,
        {content : comments}
        )
        .then((response) => {
          console.log(response);
          navigate(`/review/${postNo}`)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // const deleteComments = () => {
    //   axios
    //   .delete(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setReview((prevReview) => ({
    //       ...prevReview,
    //       comments : prevReview.comments.filter((comment) => comment.commentId !== commentId),
    //     }));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

    // const editComments = () => {
    //   axios
    //   .put(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // }

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
        
        <ul>
            {review.comments && review.comments.map(comment => (
              <li key={comment.commentId} className="RVDT-Comment">
                <span>{comment.content}</span>
                {/* <button onClick={deleteComments}>삭제</button> */}
              </li>
            ))}
          </ul>
        {/* <div>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
        </div> */}
        <form onSubmit={addComments}>
        <div>
          댓글
          <input name="comments" value={comments} onChange={(event)=>setComments(event.target.value)}/>
          <button type="submit">댓글 등록</button>
        </div>
        </form>
      </div>
      </div>
    );
  };
  // 들어가야 할것 : tagName, comments
  
  export default ReviewDetail;
