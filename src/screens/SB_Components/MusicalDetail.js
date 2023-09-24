import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/ConcertDetail.css";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";

function MusicalDetail () {
    const { no } = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [cast, setCast] = useState("");
    const [imgUrl, setImgUrl] = useState({});
    const [detailUrl, setDetailUrl] = useState({});
    const [melonUrl, setMelonUrl] = useState(null);
    const [interparkUrl, setInterparkUrl] = useState(null);
    const [elevenUrl, setElevenUrl] = useState(null);
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios
          .get(`http://43.200.58.174:8080/api/v1/musicals/${no}`, {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          })
          .then((response) => {
            setContent(response.data.content);
            setTitle(response.data.title);
            setPlace(response.data.place);
            setGenre(response.data.genre);
            setDate(response.data.date);
            setCast(response.data.cast);
            setImgUrl(response.data.imgUrl);
            setDetailUrl(response.data.detailUrl);
            setMelonUrl(response.data.melonUrl);
            setInterparkUrl(response.data.interparkUrl);
            setElevenUrl(response.data.elevenUrl);
            console.log(response.data);
            console.log(no);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [no]);
    

    return (
        <div>
      <Header />
    
        <img className="Musical-Image" src={imgUrl} alt="Musical Image" />

      <div className="Musical-Detail-Info">
        <div className="Musical-Detail-Info-Link" to={detailUrl}>
          <div className="Musical-T">
            <p className="Musical-Catecory">{genre}</p>
            <p className="Musical-Title">{title}</p>
          </div>
        </div>

        <div className="MusicalST">
          <p className="Musical-Place">장소: {place}</p>
          <p className="Musical-Date">기간: {date}</p>
          <p className="Musical-RunningTime">캐스트: {cast}</p>

          {/* Check if the URLs are not null and display the corresponding buttons */}
          {melonUrl && (
            <a href={melonUrl} target="_self">
              멜론 예매
            </a>
          )}
          {interparkUrl && (
            <button>
            <a href={interparkUrl} target="_self">
              인터파크 예매
            </a>
            </button>
          )}
          {elevenUrl && (
            <a href={elevenUrl} target="_self">
              11번가 예매
            </a>
          )}
        </div>
      </div>
    </div>
    )
}

export default MusicalDetail;