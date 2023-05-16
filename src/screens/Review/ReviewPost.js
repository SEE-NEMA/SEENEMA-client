import Header from "../../Header";
import '../styles/ReviewPost.css'
import React, {useState} from 'react';
import { useNavigate, Link, useParams} from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function ReviewPost () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] =useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    const postNo = useParams();
    const tagId = 1;

    const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tagId);
    for (let i = 0; i < images.length; i++) {
        formData.append(`images[${i}]`, images[i]); // 이미지 파일 여러 개 전달
      }

    axios.post (`http://43.200.58.174:8080/api/v1/theater-review/upload`, 
    formData,
    {
        headers: {
            'Content-Type' : 'multipart/form-data',
            "X-AUTH-TOKEN" : token
        }
    })
    .then((response) => {
        console.log(response.data);
        navigate(`/Review`);
    })
    };

    const handleImageChange = (event) => {
        const fileList = event.target.files;
    const newImages = [];
    for (let i = 0; i < fileList.length; i++) {
      newImages.push(fileList[i]);
    }
    setImages(newImages);
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

             
                <input 
                className="ReviewWrite-Image-Upload"
                type="file"
                onChange={handleImageChange}
                />

             </div>
            <button className = "ReviewWrite-Upload"  type="submit">업로드</button>
             </form>
 
             <p></p>
            
             
             </div>
 
         </div>
     )


    }

export default ReviewPost;