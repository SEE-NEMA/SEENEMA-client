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

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://43.200.58.174:8080/api/v1/user/login",
        data,
        config
      );
      const token = response.data;
      if(token ==="가입되지 않은 아이디 입니다.") {
        alert(`${token}\n아이디 오류라네요`);
        navigate("/loginM");
      }
      else if(token === "잘못된 비밀번호 입니다."){
        alert(`${token}\n 비밀번호가 틀렸다네요`);
        navigate("/loginM");
      }
      else{
        localStorage.setItem("token", token);
        login(email, token);
        localStorage.setItem("email", email);
        alert(`${email}님 안녕하세요!`);
        navigate("/M");  
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
      <h4 className="Login-Title">SEE-NEMA에 다시 오신걸 환영해요!</h4>

      <div className="login-form">
        <div className="Login-contentWrapM">
          <p className="login-txt">아이디</p>
          <input
            className="login-inputM"
            placeholder="ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="Login-contentWrapM">
          <p className="login-txt">비밀번호</p>
          <input
            className="login-inputM"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            />
        </div>
      </div>
      <div className="login-btn-div">
        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
      <div className="signup-txt">
        <h3>
          아직 회원이 아니신가요?{" "}
          <a href="/signupM" className="">
            회원가입
          </a>
        </h3>
      </div>
    </div>
  );
}

export default Login;