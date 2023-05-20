import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Header";
import "../styles/SeeyaEdit.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SeeyaEdit = () => {

    const { theaterId, viewNo } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [play, setPlay] = useState("");
    const [seat, setSeat] = useState("");
    const [viewScore, setViewScore] = useState("");
    const [seatScore, setSeatScore] = useState("");
    const [lightScore, setLightScore] = useState("");
    const [soundScore, setSoundScore] = useState("");

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`)
          .then((response) => {
            setTitle(response.data.title);
            setSeat(response.data.seat);
            setContent(response.data.content);
            setPlay(response.data.play);
            setViewScore(response.data.viewScore);
            setSeatScore(response.data.seatScore);
            setLightScore(response.data.lightScore);
            setSoundScore(response.data.soundScore);

            const urls = response.data.image.map((image) => image.imgUrl);
            setImages(urls);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [theaterId], [viewNo]);

      
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append('play', play);
        formData.append('seat', seat);
        formData.append('viewScore', viewScore);
        formData.append('seatScore', seatScore);
        formData.append('lightScore', lightScore);
        formData.append('soundScore', soundScore);
        
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]); // Append each image to the FormData
        }

    axios
      .put(`http://43.200.58.174:8080/api/v1/tview-review/${theaterId}/${viewNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          "X-AUTH-TOKEN": token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("게시물 수정이 완료되었습니다!");
        navigate("/seeyadetail");
      })
      .catch((error) => {
        console.log(error);
      });
  
   
    return(
        <div>
            <Header/>
            <div className="SeeyaEdit-Content-Wrap">
                <form onSubmit = {handleSubmit}>
                    <div className = "SeeyaEdit-Content">
                        <label className="SeeyaEdit-Title">제목</label>
                        <input
                            className="SeeyaEdit-Input"
                            placeholder="공연장+좌석을 입력해주세요"
                            name="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}>
                        </input>
                    </div>
                </form>
            </div>
        </div>
    );
};
};
    

export default SeeyaEdit;