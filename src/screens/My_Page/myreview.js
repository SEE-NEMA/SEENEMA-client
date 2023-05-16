import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Header from "../../Header";
import { AuthContext } from '../../contexts/AuthContext';
import Login from "../signup/Login";
import axios from "axios";
import '../styles/myreview.css';


function myreview() {
    const [myreview, setMyreview] = useState({});

    useEffect(() => {
        axios.get ('http://43.200.58.174:8080/api/v1/user/my-review/theater', {
            headers: {
                "X-AUTH-TOKEN" : token
            }
        })
        .then((response) => {
            console.log(response.data);
            setMyreview(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [token]);
}

return (
    <div></div>
)

export default myreview;