import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/Musical.css"
import { FaSearch } from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {TabContent} from 'react-bootstrap';
import { NavLink, useParams } from "react-router-dom";
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
            console.log(response.data.title)
        })
        .catch((error) => {
            console.log(error)
        }, [no])
    })

    return (
        <div>
        <Header/>

            <div className = "Musical-Image"> 
                <img src={imgUrl} alt="Musical Image"/>
            </div>
           

            <div className = "Musical-Detail-Info">
                <div className = "Musical-T">
                    <p className = "Musical-Catecory">카테고리 : 
                    {genre}
                    </p>
                    <p className = "Musical-Title">뮤지컬 제목 : 
                    {title}
                    </p>
                </div>

                <div className = "MusicalST">
                    <p className = "Musical-Place">장소 : {place}</p>
                    <p className = "Musical-Date">기간 : {date}</p>
                    <p className = "Musical-RunningTime">캐스트 : {cast}</p>
                </div>
            </div>

        </div>
    )
}

export default MusicalDetail;