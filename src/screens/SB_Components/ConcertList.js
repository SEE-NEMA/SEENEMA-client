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
          
            {musical.map((musicals) => (

            <li key={musicals.no} >
        
            <Link to={`/concerts/${musicals.no}`}>
            <img src={musicals.imgUrl} alt={musicals.title} />
            <h4>{musicals.title}</h4>
            <h6>{musicals.place}</h6>
            </Link>

            </li>
            ))}
           
            </div>
        </div>
        
    )
}

export default ConcertList;
