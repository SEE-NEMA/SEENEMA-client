/*공연장 후기 작성화면*/
import Header from "../../Header";
import '../styles/ReviewWrite.css'
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";




function ReviewWrite () {

   
    return(
        
       <div>
        <Header></Header>
       
            <div className='ReviewWrite-ContentWrap'>

            <div className = 'RW-CW'>
                <label className = "ReviewWrite-Title">제목</label>
                <input className = 'ReviewWrite-Input' placeholder=' [ 공연장 이름 + 공연 ] 으로 작성해주세요.'></input>
            </div>

            <p></p>

            <div className='ReviewWrite-Content'>
                <label className = 'ReviewWrite-Label'>
                내용</label>
                <textArea className = 'ReviewWrite-Text' ></textArea>
            </div>

            <p></p>
            </div>

        <button className = "ReviewWrite-Upload">업로드</button>
        </div>
    )
}

export default ReviewWrite;