import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://43.200.58.174:8080/api/v1/user/login",
        data,
        {
          headers: {
            "X-AUTH-TOKEN": token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.data != '가입되지 않은 아이디 입니다.' && response.data != "잘못된 비밀번호 입니다.") {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        login(email, token);
        navigate("/");
      } 
      else if (response.data === '가입되지 않은 아이디 입니다.')
      {
        alert("로그인 실패");
      }
      else if (response.data === "잘못된 비밀번호 입니다.")
      {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <h4 className="Login-Title">seeNEMA에 다시 오신걸 환영해요!</h4>

      <div className="Login-page">
        <div className="Login-contentWrap">
          <input
            className="Login-input"
            placeholder="ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p></p>
          <input
            className="Login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div>
        <button className="Login-certify" onClick={handleLogin}>
          로그인
        </button>
      </div>
      <h3 className="QuestionText">
        아직 회원이 아니신가요?{" "}
        <a href="/signup" className="signup_link">
          회원가입
        </a>
      </h3>
    </div>
  );
}

export default Login;
