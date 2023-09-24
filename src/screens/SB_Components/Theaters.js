import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/Musical.css"
import { FaSearch } from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {TabContent} from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Theaters () {
    const {no} = useParams();
    
    const [musical, setMusical] = useState([]);

    useEffect(() => {
        axios({
            method:"GET",
            url : "http://43.200.58.174:8080/api/v1/theaters"
        })
        .then((response) => {
            setMusical(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })

    return (
        <div>
        <Header/>
        <div className="musical-WrapContent">
            <input className="musical_searchbar" placeholder="뮤지컬 제목을 입력하세요"></input>
            <hr className="Musical_hr"/>
            <div className="MusicalList">
            {musical.map((musicals) => (
            <li key={musicals.no} className="musicalItem">
            <div className="musical_content">
                <h4>{musicals.theaterName}</h4>
                <h6>{musicals.place}</h6>
            </div>
            </li>
            ))}
            </div>
        </div>
        </div>
    )
}

export default Theaters;