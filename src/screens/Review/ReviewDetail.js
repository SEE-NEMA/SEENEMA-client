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
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const openEditModal = (commentId, content) => {
      console.log(commentId);
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
  useEffect(() => {
    setHeartCount(review.heartCount);
    setHeartedYN(review.heartedYN);
  }, [review]);

  useEffect(() => {
    const storedHeartedYN = localStorage.getItem("heartedYN") === "true";
    setHeartedYN(storedHeartedYN);
    console.log(storedHeartedYN);
  }, []);

  useEffect(() => {
    localStorage.setItem("heartedYN", heartedYN);
  }, [heartedYN]);

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
                setHeartedYN(response.data.heartedYN);
                setHeartCount(response.data.heartCount);
                localStorage.setItem("heartedYN", response.data.heartedYN);
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
                setHeartedYN(response.data.heartedYN);
                setHeartCount(response.data.heartCount);
                localStorage.setItem("heartedYN", response.data.heartedYN);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          console.log(response.data);
          setReview(response.data);
          setContent(response.data.content);
          const urls = response.data.image.map((image) => image.imgUrl);
           setImageUrls(urls);
           console.log(response.data.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [postNo]);


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
              // navigate(`/review/${postNo}`);
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
      axios
        .post(
          `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}/auth`,
          {},
          { headers: { "X-AUTH-TOKEN": token } }
        )
        .then((response) => {
          if (response.status === 200) {
            axios
              .put(
                `http://43.200.58.174:8080/api/v1/theater-review/${postNo}/${commentId}`,
                { content: editCommentContent },
                { headers: { "X-AUTH-TOKEN": token } }
              )
              .then((response) => {
                console.log(response);
                closeEditModal();
                // Update the review state with the updated comment
                setReview((prevReview) => {
                  const updatedComments = prevReview.comments.map((comment) => {
                    if (comment.commentId === commentId) {
                      return { ...comment, content: editCommentContent };
                    }
                    return comment;
                  });
                  return { ...prevReview, comments: updatedComments };
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log(response.data);
          }
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
            {review.tagId}

      {/* {heartedYN ? (
                <FaHeart size="25" className="Heart-Filled" onClick={handleLikeClick} />
              ) : (
                <FaHeart size="25" className="Heart-Empty" onClick={handleLikeClick} />
              )} */}
        <div className="review-detail-like">
  {heartedYN ? (
    <FaHeart
      size="25"
      className="Heart-Filled"
      onClick={handleLikeClick}
    />
  ) : (
    <FaHeart
      size="25"
      className="Heart-Empty"
      onClick={handleLikeClick}
    />
  )}
  <span>좋아요 수 : {heartCount}</span>
</div>
           
            <button className="RVDT-Modify" onClick={handleEditClick}>수정</button>
            <button className="RVDT-Modify" onClick={handleDeleteClick}>삭제</button>
        
        </div>
        <p/>

        <div className="RVDT-Content">{review.content}</div>
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

        <p className="RVDT-Content">comment</p>
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
  });
  // 들어가야 할것 : tagName, comments
}
  export default ReviewDetail;