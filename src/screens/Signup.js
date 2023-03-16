import React, {useState} from 'react';
import Login from './Login';
import './styles/Signup.css';

function Signup () {
    return (
                
        <div>
        <h4 className="Signup-Title">시작하기</h4>
        
        <div className="Signup-Page">
        
        <div className="Signup-ContentWrap">
        
        
        <input className="signupinput" placeholder='Name' />

        <p></p>

        <div className = "EmailWrap">
        
        <input className="signupinput" placeholder='Email'/>  <button className = "emailCT">중복확인</button>
        
        </div>

        <p></p>
        
       
        
        <input className="signupinput" placeholder='Password' type="password" />

        <p></p>

       
        <input className="signupinput" placeholder='Password certify' type="password"/>


        </div>
    </div> 
        
        <div>
        <button className="bottomButton2">
        회원가입
        </button>
        </div>
        
        <h3 className="QuestionText2">
        이미 회원이신가요? <a href="/Login" className='link_login'>로그인</a>
        </h3>
        
    </div>
) }
        

export default Signup;