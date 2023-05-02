import Header from "../../Header";
import '../styles/ReviewPost.css'
import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function ReviewPost () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] =useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://43.200.58.174:8080/api/v1/theater-review/upload', {
            title : title,
            content : content,
            tags : [{tagId : 1}]
        })
        .then((response) => {
            console.log(response)
            navigate('/review');
        })
        .catch((error) => {
            console.log(error);
        });
    }   
    return(
        
        <div>
         <Header></Header>
        
             <div className='ReviewWrite-ContentWrap'>
 
             <form onSubmit={handleSubmit}>
             <div className = 'RW-CW'>
                 <label className = "ReviewWrite-Title">제목</label>
                 <input className = 'ReviewWrite-Input' placeholder=' [ 공연장 이름 + 공연 ] 으로 작성해주세요.'
                 name='title' value={title} onChange={(event) => setTitle(event.target.value)}
                 ></input>
             </div>
 
             <p></p>
 
             <p></p>
 
             <div className='ReviewWrite-Content'>
                 
                 <textarea className = 'ReviewWrite-Text' 
                 name='content' value={content} onChange={(event)=>setContent(event.target.value)}
                 ></textarea>
             </div>
            <button className = "ReviewWrite-Upload"  type="submit">업로드</button>
             </form>
 
             <p></p>
            
             
             </div>
 
         </div>
     )


    }
   
export default ReviewPost;