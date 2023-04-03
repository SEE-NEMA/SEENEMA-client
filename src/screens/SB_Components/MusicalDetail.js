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
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [imgUrl, setImgUrl] = useState({});

    useEffect(() => {
        axios
        .get(`http://43.200.58.174:8080/api/v1/musicals/${no}`)
        .then((response) => {
            setTitle(response.title);
            setPlace(response.place);
            setImgUrl(response.imgUrl);
            console.log(response.title)
        })
        .catch((error) => {
            console.log(error)
        }, [no])
    })

    return (
        <div>
        <Header/>

            <div className = "Musical-Image"> </div>
           

            <div className = "Musical-Detail-Info">
                <div className = "Musical-T">
                    <p className = "Musical-Catecory">카테고리</p>
                    <p className = "Musical-Title">뮤지컬 제목</p>
                    <p>{title}</p>
                </div>

                <div className = "MusicalST">
                    <p className = "Musical-Place">장소</p>
                    <p className = "Musical-Rate">공연장 총평</p>
                    <p className = "Musical-Date">기간</p>
                    <p className = "Musical-RunningTime">러닝타임</p>
                </div>
            </div>

        </div>
    )
}

export default MusicalDetail;