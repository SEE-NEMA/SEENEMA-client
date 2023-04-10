import React, {useState} from 'react';
import axios from 'axios';
import '../styles/Login.css'
import Signup from './Signup';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://43.200.58.174:8080/api/v1/user/login', data);
            console.log(response.data);
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
