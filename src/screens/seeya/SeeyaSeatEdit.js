import React, { useState } from "react";
import { useParams, useNavigate  } from 'react-router-dom';
import axios from "axios";

const SeeyaSeatEdit = () => {
  const [play, setPlay] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [viewScore, setViewScore] = useState(0);
  const [seatScore, setSeatScore] = useState(0);
  const [lightScore, setLightScore] = useState(0);
  const [soundScore, setSoundScore] = useState(0);
  const [images, setImages] = useState(null);
  const token = localStorage.getItem("token");
  const { theaterId, x, y, z, viewNo } = useParams();
  const navigate = useNavigate();

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("play", play);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("viewScore", viewScore);
      formData.append("seatScore", seatScore);
      formData.append("lightScore", lightScore);
      formData.append("soundScore", soundScore);
      formData.append("images", images);

      const response = await axios.put(
        `http://43.200.58.174:8080/api/v1/seats/${theaterId}/${z}/${x}/${y}/${viewNo}`,
        formData,
        {
          headers: {
            "X-AUTH-TOKEN": token
          },
        }
      );

      console.log(response.data);
      navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
      alert("게시물 수정이 완료되었습니다!");
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <div>
      <h3>Edit Seeya Seat</h3>
      <form onSubmit={handleEditSubmit}>
        <label>공연:</label>
        <input
          type="text"
          value={play}
          onChange={(e) => setPlay(e.target.value)}
        />
        <br />
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>내용:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <label>시야평점:</label>
        <input
          type="number"
          value={viewScore}
          onChange={(e) => setViewScore(e.target.value)}
        />
        <br />
        <label>좌석평점:</label>
        <input
          type="number"
          value={seatScore}
          onChange={(e) => setSeatScore(e.target.value)}
        />
        <br />
        <label>조명평점:</label>
        <input
          type="number"
          value={lightScore}
          onChange={(e) => setLightScore(e.target.value)}
        />
        <br />
        <label>음향평점:</label>
        <input
          type="number"
          value={soundScore}
          onChange={(e) => setSoundScore(e.target.value)}
        />
        <br />
        <label>사진:</label>
        <input
          type="file"
          onChange={(e) => setImages(e.target.files[0])}
        />
        <button className="SeeyaEdit-Button" type="submit"></button>
      </form>
    </div>
  );
}

export default SeeyaSeatEdit;
