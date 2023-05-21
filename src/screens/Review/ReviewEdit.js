import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Header";
import { AuthContext } from "../../contexts/AuthContext";

const ReviewEdit = () => {
  const { postNo } = useParams();
  const [review, setReview] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const token = localStorage.getItem("token");
  const tagId = 1;
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`)
      .then((response) => {
        setReview(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        const urls = response.data.image.map((image) => image.imgUrl);
        setImage(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postNo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append('tags', tagId);

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]); // Append each image to the FormData
    }

    axios
      .put(`http://43.200.58.174:8080/api/v1/theater-review/${postNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          "X-AUTH-TOKEN": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("게시물 수정이 완료되었습니다!");
        navigate("/review");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="ReviewWrite-ContentWrap">
        <form onSubmit={handleSubmit}>
          <div className="RW-CW">
            <label className="ReviewWrite-Title">제목</label>
            <input
              className="ReviewWrite-Input"
              placeholder="[ 공연장 이름 + 공연 ] 으로 작성해주세요."
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <p></p>

          <p></p>

          <div className="ReviewWrite-Content">
            <textarea
              className="ReviewWrite-Text"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </div>
          <button className="ReviewWrite-Upload" type="submit">
            수정
          </button>
        </form>
        <p></p>
      </div>
    </div>
  );
};

export default ReviewEdit;
