import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from '../../Header'
import "../styles/ReviewDetail.css"
import { AuthContext } from "../../contexts/AuthContext";

const ReviewDetail = () => {

    const {postNo} = useParams();
    const [review, setReview] = useState({});
    const [content, setContent] = useState("");
    const [comments, setComments] = useState("");
    const [commentId, setCommentId] = useState({});
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const openEditModal = (commentId, content) => {
      setEditCommentId(commentId);
      setEditCommentContent(content);
    };

    const closeEditModal = () => {
      setEditCommentId(null);
      setEditCommentContent("");
    }


  
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
      axios.post(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/auth`, {}, {headers: {'X-AUTH-TOKEN': token}})
        .then((response) => {
          if (response.data === "SUCCESS") {
            axios.delete(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`, {headers: {'X-AUTH-TOKEN': token}})
              .then((response) => {
                console.log(response.data);
                navigate("/review");
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
    
    const deleteComment = (commentId) => {
      axios
        .delete(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`)
        .then((response) => {
          console.log(response);
          setReview(prevReview => ({
            ...prevReview,
            comments: prevReview.comments.filter(comment => comment.commentId !== commentId)
          }))
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const editComment = (commentId) => {
      axios
    .put(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`, 
    { content: editCommentContent })
    .then((response) => {
      console.log(response);
      closeEditModal();
      navigate(`/review/${postNo}`);
    })
    .catch((error) => {
      console.log(error);
    });
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

           
            <button className="RVDT-Modify" onClick={handleEditClick}>수정</button>
            <button className="RVDT-Modify" onClick={handleDeleteClick}>삭제</button>
        
        </div>
        <p/>

        <div className="RVDT-content">{review.content}</div>
        <div>
  {imageUrls.map(url => (
    <img src={url} alt="" />
  ))}
</div>

       <hr className="RVDT-hr"></hr>

        <p className="RVDT-Co">comment</p>
        <ul>
            {review.comments && review.comments.map(comment => (
              <li key={comment.commentId} className="RVDT-Comment">
                <span>{comment.content} Id : {comment.commentId}</span>
                <button className="RVDT-button" onClick={() => openEditModal(comment.commentId, comment.content)}>수정</button>
                <button className="RVDT-button" onClick={() => deleteComment(comment.commentId)}>삭제</button>
              </li>
            ))}
          </ul>

          {editCommentId !== null && (
              <div className="RVDT-EditModal">
              <div className="RVDT-EditModalContent">
              <button className="RVDT-CloseEditModal" onClick={closeEditModal}>
                 X
              </button>
              <h3>댓글 수정</h3>
              <textarea value={editCommentContent} onChange={(e) => setEditCommentContent(e.target.value)} />
              <button onClick={editComment}>수정하기</button>
              </div>
              </div>
          )}

        
        <form onSubmit={addComments}>
        <div className="RVDT-comments">
          댓글 :
          <input className = "RVDT-input" name="comments" value={comments} onChange={(event)=>setComments(event.target.value)}/>
          <button className = "RVDT-comment-submit" type="submit">댓글 등록</button>
        </div>
        </form>
      </div>
      </div>
    );
  };
  // 들어가야 할것 : tagName, comments
  
  export default ReviewDetail;