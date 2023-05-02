import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        const data = {
            email: email,
            password: password
        };
    
    const config = {
        headers : {
            'Content-Type' : 'application/json',
            'X-AUTH-TOKEN' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNTAyc2VpbiIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2ODMwMjM2NTMsImV4cCI6MTY4MzExMDA1M30.y7pKEq85OGRy7ayp881VisOvqCUpPgZ2OjWFwG1y2pY'
        }
    };

        try {
            const response = await axios.post('http://43.200.58.174:8080/api/v1/user/login', data, config);
            console.log(response.data);
            localStorage.setItem('token', response.data);
            login(email); // 이메일을 전달하여 login함수 호출
            alert(`${email}님 안녕하세요!`);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h4 className="Login-Title">seeNEMA에 다시 오신걸 환영해요!</h4>
    
            <div className="Login-page">
                <div className="Login-contentWrap">
                    <input className="Login-input" placeholder='ID' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <p></p>
                    <input className="Login-input" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div> 
            <div>
                <button className="Login-certify" onClick={handleLogin}>
                    로그인
                </button>
            </div>
            <h3 className="QuestionText">
                아직 회원이 아니신가요?  <a href= "/signup" className='signup_link'>회원가입</a>
            </h3>
        </div>
    ) 
}

export default Login;