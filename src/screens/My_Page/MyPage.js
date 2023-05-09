import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from "../../Header";
import { AuthContext } from '../../contexts/AuthContext';
import Login from "../signup/Login";
import '../styles/MyPage.css';

function MyPage() {
  const { user } = useContext(AuthContext);
  
  return (
    <div>
      <Header/>
      <h1>My Page</h1>
          {user}
    </div>
  )
}

export default MyPage;
