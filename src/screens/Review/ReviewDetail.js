import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../Header';
import "../styles/ReviewDetail.css";
import { AuthContext } from "../../contexts/AuthContext";

const ReviewDetail = () => {
  const { postNo } = useParams();
  const [review, setReview] = useState({});
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");
  const [commentId, setCommentId] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedCommentContent, setEditCommentContent] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const token = localStorage.getItem("token");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [heartCount, setHeartCount] = useState();
  const [heartedYN, setHeartedYN] = useState(false);

  const navigate = useNavigate();

  const openEditModal = (commentId, commentContent) => {
    setEditCommentId(commentId);
    setEditCommentContent(commentContent);
  };

  const closeEditModal = () => {
    setEditCommentId(null);
    setEditCommentContent("");
  };

  useEffect(() => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`)
      .then((response) => {
        console.log(response.data);
        setReview(response.data);
        setContent(response.data.content);
        setTags(response.data.tags);
        const urls = response.data.image.map((image) => image.imgUrl);
        setImageUrls(urls);
        setHeartedYN(response.data.setHeartYN);
        setTagName(response.data.tagName);
        console.log(response.data.tags.map(tag => tag.tagName));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postNo]);
  
  const handleLikeClick = () => {
    axios
      .post(
        `http://43.200.58.174:8080/api/v1/theater-review/auth`,
        {},
        { headers: { "X-AUTH-TOKEN": token } }
      )
      .then((response) => {
        if (response.data === "SUCCESS") {
          if (heartedYN) {
            // 이미 좋아요를 눌렀을 경우 좋아요 취소 요청
            axios
              .delete(
                `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/heart`,
                { headers: { "X-AUTH-TOKEN": token } }
              )
              .then((response) => {
                console.log(response.data);
                setHeartedYN(false);
                setHeartCount(response.data.heartCount);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // 좋아요 추가 요청
            axios
              .post(
                `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/heart`,
                {},
                { headers: { "X-AUTH-TOKEN": token } }
              )
              .then((response) => {
                console.log(response.data);
                setHeartedYN(true);
                setHeartCount(response.data.heartCount);
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
      axios.post(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/auth`, {}, {headers: {'X-AUTH-TOKEN': token}})
        .then((response) => {
          if (response.data === "SUCCESS") {
            navigate(`/ReviewEdit/${postNo}`);
          } 
          else {
            console.log(response.data);
            alert("본인이 작성한 게시물만 수정할 수 있습니다");
          }
        }
        )
    }

    const handleDeleteClick = () => {
      axios.post(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}/auth`, {}, {headers: {'X-AUTH-TOKEN': token}})
        .then((response) => {
          if (response.data === "SUCCESS") {
            axios.delete(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`, {headers: {'X-AUTH-TOKEN': token}})
              .then((response) => {
                console.log(response.data);
                alert("게시물 삭제가 완료되었습니다!");
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

    const addComments = async () => {
      try {
        const response = await axios.post('http://43.200.58.174:8080/api/v1/theater-review/auth', {}, {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token
          }
        }
        );
  
        console.log(response);
  
        if (response.data === "SUCCESS") {
          axios
            .post(
              `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/comment`,
              { content: comments },
              { headers: { "X-AUTH-TOKEN": token } }
            )
            .then((response) => {
              console.log(response);
              navigate(`/review/${postNo}`);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("로그인 한 사용자만 작성 가능합니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버 오류가 발생했습니다.");
      }
    };
    
    
    const deleteComment = (commentId) => {
      axios
        .post(
          `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}/auth`,
          {},
          { headers: { 'X-AUTH-TOKEN': token } }
        )
        .then((response) => {
          if (response.data === 'SUCCESS') {
            axios
              .delete(
                `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`,
                { headers: { 'X-AUTH-TOKEN': token } }
              )
              .then((response) => {
                console.log(response.data);
                setReview((prevReview) => ({
                  ...prevReview,
                  comments: prevReview.comments.filter(
                    (comment) => comment.commentId !== commentId
                  ),
                }));
              })
              .catch((error) => {
                console.log(error);
              });
              console.log(response);
          } else {
            console.log(response.data);
          }
        });
    };
    
    const editComment = (commentId) => {
      const editedComment = "수정된 댓글 내용"; // 수정할 댓글 내용
    
      // POST 요청을 보내어 댓글 수정 모달창을 띄워줍니다.
      axios
        .post(
          `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}/auth`,
          { content: editedCommentContent },
          { headers: { "X-AUTH-TOKEN": token } }
        )
        .then((response) => {
          if (response.data === "SUCCESS") {
            axios
              .put(
                `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`,
                { content: editedCommentContent },
                { headers: { "X-AUTH-TOKEN": token } }
              )
              .then((response) => {
                console.log(response.data);
                const updatedComments = review.comments.map((comment) => {
                  if (comment.commentId === commentId) {
                    return { ...comment, content: editedCommentContent };
                  }
                  return comment;
                });
                setReview((prevReview) => ({
                  ...prevReview,
                  comments: updatedComments,
                }));
                closeEditModal(); // Close the edit modal
                navigate(`/review/${postNo}`); // Navigate back to the original review page
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (response.data === "FAIL") {
            console.log(response.data);
            alert("댓글 수정에 실패했습니다.");
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    
    
    
    return (
      <div>
        <Header/>
        <div className="RVDT-Wrap">
        <h2 className="RVDT-title">{review.title}</h2>
        <div className="RVDT-Detail">
            <h6 className="RVDT-nickname">작성자 : {review.nickName}</h6>
            <h6 className="RVDT-createdAt">작성 일자 : {review.createdAt}</h6>
            <h6 className="RVDT-viewCount">조회수 : {review.viewCount}</h6>
            {heartedYN ? (
      <button onClick={handleLikeClick}>좋아요 취소</button>
    ) : (
      <button onClick={handleLikeClick}>좋아요</button>
    )}
    <p>좋아요 수: {heartCount}</p>
           
            <div className="RVDT-Modify-Wrap">
            <button className="RVDT-Modify" onClick={handleEditClick}>수정</button>
            <button className="RVDT-Modify" onClick={handleDeleteClick}>삭제</button>
            </div>

        </div>
        <p/>

        <div className="RVDT-Content">
        {review.content}
        {review.tags && review.tags.map(tag => (
        <span key={tag.tagId}><h5># {tag.tagName}</h5></span>
      ))}
        </div>
        <div>


        {imageUrls.length > 0 && (
  <div>
    {imageUrls.map((imageUrl, index) => (
      <img key={index} src={imageUrl} alt="" />
    ))}
  </div>
)}

</div>



       <hr className="RVDT-hr"></hr>

        <p className="RVDT-comment">comment</p>
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
          <textarea
            value={editedCommentContent}
            onChange={(e) => setEditCommentContent(e.target.value)}
          />
          <button onClick={() => editComment(editCommentId)}>수정하기</button>
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