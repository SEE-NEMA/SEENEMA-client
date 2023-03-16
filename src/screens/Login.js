import React, {useState} from 'react';
import './styles/Login.css'
import Signup from './Signup';

function Login () {
    return (
        
        <div>
        <h4 className="LoginTitle">SEEnema에 다시 오신걸 환영해요!</h4>
    
        <div className="Loginpage">
    
        <div className="Login-contentWrap">
    
           
            <input className="loginidinput" placeholder='Email'/>
    
            <p></p>
            
            
            <input className="loginidinput" type="password" placeholder='Password'/>
       
            </div>
        </div> 
    
        <div>
            <button className="bottomButton">
                로그인
            </button>
        </div>
    
        <h3 className="QuestionText">
            아직 회원이 아니신가요?  <a href= "/Signup" className='signup_link'>회원가입</a>
        </h3>
    
    </div>


) }

export default Login;