import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/Musical.css"
import { FaSearch } from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {TabContent} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";

function Musical () {
    
    const [musical, setMusical] = useState([]);

    useEffect(() => {
        axios({
            method:"GET",
            url : "http://43.200.58.174:8080/api/v1/musicals"
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
            <div className="MusicalList">
            <ul>
            {musical.map((musicals) => (
                <li key="musicals.title">
                    <span>{musicals.title}</span>
                </li>
            ))}
            </ul>
            </div>
        </div>
        </div>
    )
}

export default Musical;