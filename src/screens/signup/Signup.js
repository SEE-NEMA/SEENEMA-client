import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://43.200.58.174:8080/signup',
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4 className="Signup-titlename">시작하기</h4>

      <div className="Signup-Page">
        <div className="Signup-ContentWrap">
          <div className="EmailWrap">
            <input
              className="Signup-input"
              placeholder="ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="emailCT">중복확인</button>
          </div>

          <p></p>

          <input
            className="Signup-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button className="bottomButton2" onClick={handleSubmit}>
          회원가입
        </button>
      </div>

      <h3 className="QuestionText2">
        이미 회원이신가요?
        <a href="/Login" className="link_login">
          로그인
        </a>
      </h3>
    </div>
  );
}

export default Signup;
