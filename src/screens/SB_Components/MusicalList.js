import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/MusicalList.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function MusicalList () {
    const [musical, setMusical] = useState([]);

    useEffect(() => {
        axios({
          method: "GET",
          url: "http://43.200.58.174:8080/api/v1/musicals"
        })
        .then((response) => {
          setMusical(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }, []);

    return (
        <div>
        <Header/>
            <div className="musical-WrapContent">
            
            {musical.map((musicals) => (
             
            <li key={musicals.no}>

            <Link to={`/musicals/${musicals.no}`} key={musicals.no}>
            <img src={musicals.imgUrl} alt={musicals.no} />
            <h4>{musicals.title}</h4>
            <h6>{musicals.place}</h6>
            </Link>
            
            </li>
            ))}
            
            </div>
        </div>
       
    )
}

export default MusicalList;