import Header from "../../Header";
import "../styles/ReviewPost.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function ReviewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const postNo = useParams();

  const handleTagClick = (tagId) => {
    if (tags.includes(tagId)) {
      // 이미 선택된 태그인 경우 제거
      setTags(tags.filter((tag) => tag !== tagId));
    } else {
      // 선택되지 않은 태그인 경우 추가
      setTags([...tags, tagId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tags.length === 0) {
      alert("태그를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    tags.forEach((tag) => {
      formData.append("tags[]", tag); // 선택된 태그들을 전송
    });
    for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]); // 이미지 파일 여러 개 전달
    }

    axios
      .post("http://43.200.58.174:8080/api/v1/theater-review/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-AUTH-TOKEN": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/Review`);
      });
  };

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const newImages = [];
    for (let i = 0; i < fileList.length; i++) {
      newImages.push(fileList[i]);
    }
    setImages(newImages);
  };

  return (
    <div>
      <Header></Header>

      <div className="ReviewWrite-ContentWrap">
        <form onSubmit={handleSubmit}>
          <div className="RW-CW">
            <label className="ReviewWrite-Title">제목</label>
            <input
              className="ReviewWrite-Input"
              placeholder=" [ 공연장 이름 + 공연 ] 으로 작성해주세요."
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
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

            <label htmlFor="image">사진</label>
            <input type="file" onChange={handleImageChange} />
          </div>

          <div className="tag-buttons">
            <button
              onClick={() => handleTagClick(1)}
              className={tags.includes(1) ? "selected" : ""}
              type="button" // Add type="button" to prevent form submission
            >
              맛집
            </button>
            <button
              onClick={() => handleTagClick(2)}
              className={tags.includes(2) ? "selected" : ""}
              type="button" // Add type="button" to prevent form submission
            >
              카페
            </button>
            <button
              onClick={() => handleTagClick(3)}
              className={tags.includes(3) ? "selected" : ""}
              type="button" // Add type="button" to prevent form submission
            >
              대여
            </button>
            <button
              onClick={() => handleTagClick(4)}
              className={tags.includes(4) ? "selected" : ""}
              type="button" // Add type="button" to prevent form submission
            >
              물품 보관소
            </button>
            <button
              onClick={() => handleTagClick(5)}
              className={tags.includes(5) ? "selected" : ""}
              type="button" // Add type="button" to prevent form submission
            >
              주차장
            </button>
            <button
              onClick={() => handleTagClick(6)}
              className={tags.includes(6) ? "selected" : ""}
              type="button" // Add type="button" to prevent form submission
            >
              화장실
            </button>
          </div>

          <button className="ReviewWrite-Upload" type="submit">
            업로드
          </button>
        </form>

        <p></p>
      </div>
    </div>
  );
}

export default ReviewPost;
