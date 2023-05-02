import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/ConcertList.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ConcertList () {
    const {no} = useParams();
    
    const [musical, setMusical] = useState([]);

    useEffect(() => {
        axios({
            method:"GET",
            url : "http://43.200.58.174:8080/api/v1/concerts"
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
          
            <div className="MusicalList">
            {musical.map((musicals) => (
            <li key={musicals.no} className="musicalItem">
            <div className="musical_img">
                <Link to={`/musical/${musicals.no}`}>
                <img src={musicals.imgUrl} alt={musicals.title} />
                </Link>
            </div>
            <div className="concert_content">
                <h4>{musicals.title}</h4>
                <h6>{musicals.place}</h6>
            </div>
            </li>
            ))}
            </div>
        </div>
        </div>
    )
}

export default ConcertList;
