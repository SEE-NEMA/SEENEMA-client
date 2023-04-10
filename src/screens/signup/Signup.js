import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';
import SignupModal from '../../SignupModal';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(
        'http://43.200.58.174:8080/api/v1/user/signup',
        data
      );
      setIsModalOpen(true);
      setModalMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsModalOpen(true);
      setModalMessage('회원가입에 실패하였습니다.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h4 className="Signup-titlename">seeNEMA에 오신걸 환영합니다!</h4>

      <div className="Signup-Page">
        <div className="Signup-ContentWrap">
          <div className="EmailWrap">
            <input
              className="Signup-ID"
              placeholder="ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p></p>

          <input
            className="Signup-PW"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button className="Signup-Button" onClick={handleSubmit}>
          회원가입
        </button>
      </div>

      <h3 className="Signup-QuestionText">
        이미 회원이신가요?
        <a href="/Login" className="Signup-LinktoLogin">
          로그인
        </a>
      </h3>

      <SignupModal
        isOpen={isModalOpen}
        content={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
}

export default Signup;
