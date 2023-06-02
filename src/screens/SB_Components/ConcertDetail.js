import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/ConcertDetail.css"
import { NavLink, useParams, Link } from "react-router-dom";
import axios from "axios";

function ConcertDetail () {
    const {no} = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [cast, setCast] = useState("")
    const [imgUrl, setImgUrl] = useState({});
    const [detailUrl, setDetailUrl] = useState({});

    useEffect(() => {
        axios
        .get(`http://43.200.58.174:8080/api/v1/concerts/${no}`)
        .then((response) => {
            setContent(response.data.content);
            setTitle(response.data.title);
            setPlace(response.data.place);
            setGenre(response.data.genre);
            setDate(response.data.date);
            setCast(response.data.cast);
            setImgUrl(response.data.imgUrl);
            setDetailUrl(response.data.detailUrl);
            console.log(response.data.title)
            console.log(no)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [no]);

    return (
        <div>
        <Header/>

            <Link to = {detailUrl}>
            <img className="Musical-Image" src={imgUrl} alt="Musical Image"/>
            </Link>

            <div className = "Musical-Detail-Info">

            <Link className="Musical-Detail-Info-Link" to = {detailUrl}>
                <div className = "Musical-T">
                    <p className = "Musical-Catecory">
                    {genre}
                    </p>
                    <p className = "Musical-Title">
                    {title}
                    </p>
                </div>
                </Link>

                <div className = "MusicalST">
                    <p className = "Musical-Place">장소 : {place}</p>
                    <p className = "Musical-Date">기간 : {date}</p>
                    <p className = "Musical-RunningTime">캐스트 : {cast}</p>
                </div>
            </div>

        </div>
    )
}

export default ConcertDetail;
