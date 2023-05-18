import Header from "../../Header";
import "../styles/ReviewPost.css";
import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", selectedTag);
    for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]);
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

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
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

            <label htmlFor="tag">태그</label>
            <select name="tag" value={selectedTag} onChange={handleTagChange}>
              <option value="">태그 선택</option>
              <option value="1">맛집</option>
              <option value="2">카페</option>
              <option value="3">대여</option>
              <option value="4">물품 보관소</option>
              <option value="5">주차장</option>
              <option value="6">화장실</option>
            </select>
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
