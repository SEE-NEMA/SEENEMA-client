import React, { useEffect, useState } from "react";
import HeaderM from "../../HeaderM";
import "../styles/MusicalDetail.css"
import { NavLink, useParams, Link } from "react-router-dom";
import axios from "axios";

function MusicalDetail () {
    const {no} = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [cast, setCast] = useState("")
    const [imgUrl, setImgUrl] = useState({});
    const [detailUrl, setDetailUrl] = useState({});
    const [melonUrl, setMelonUrl] = useState(null);
    const [interparkUrl, setInterparkUrl] = useState(null);
    const [elevenUrl, setElevenUrl] = useState(null);

    useEffect(() => {
        axios
        .get(`http://43.200.58.174:8080/api/v1/musicals/${no}`)
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
        })
        .catch((error) => {
            console.log(error)
        });
    }, [no]);

    return (
        <div>
            <HeaderM/> 
            <div className="contentWrap-play-detailM">
                <img className="play-detail-imgM" src={imgUrl} alt="PlayDetailIMG"/>
                <div className="play-detail-infoM">
                    <div className="detail-genreM">{genre}</div>
                    <div className="detail-titleM">{title}</div>
                    <div className="detail-dataM">
                        <p>장소 : {place}</p>
                        <p>기간 : {date}</p>
                        <p>캐스트 : {cast}</p>
                    </div>
                    <div className="ticket-btnM">
                        {melonUrl && (
                            <button>
                                <a href={melonUrl} target="_self">
                                    멜론 예매 바로가기
                                </a>
                            </button>
                        )}
                        {interparkUrl && (
                            <button>
                                <a href={interparkUrl} target="_self">
                                    인터파크 예매 바로가기
                                </a>
                            </button>
                        )}
                        {elevenUrl && (
                            <button>
                                <a href={elevenUrl} target="_self">
                                    11번가 예매 바로가기
                                </a>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicalDetail;
