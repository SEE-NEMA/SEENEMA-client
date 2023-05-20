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
            console.log(response.data);

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
            formData.append("images", images[i]); 
        }

    axios
      .put(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/${viewNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
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
         
        </div>
    );
};
};
    

export default SeeyaEdit;