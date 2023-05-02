import React, { useState } from 'react';
import Header from './Header';
import { AiOutlineBars } from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import Sidebar from './components/Sidebar';
import Main from './screens/Main';
import {BrowserRouter,Switch, Route, Routes} from "react-router-dom";
import Review from './screens/Review/Review';
import ReviewDetail from './screens/Review/ReviewDetail';
import ReviewEdit from './screens/Review/ReviewEdit';
import ReviewPost from './screens/Review/ReviewPost';
import Seeya from './screens/SB_Components/Seeya';
import Matzip from './screens/SB_Components/Matzip';
import Musical from './screens/SB_Components/Musical';
import Concert from './screens/SB_Components/Concert';
import MyPage from './screens/My_Page/MyPage';
import Facility from './screens/SB_Components/Facility';
import SeeyaMain from './screens/seeya/SeeyaMain';
import SeeyaDetail from './screens/seeya/SeeyaDetail';
import SeeyaUpload from './screens/seeya/SeeyaUpload';
import SeeyaReview from './screens/seeya/SeeyaReview';
import Signup from './screens/signup/Signup';
import Login from './screens/signup/Login';


function App ()
{
  return(
    <BrowserRouter>
      <Routes>

        <Route path={"/"} element={<Main/>}></Route>
        <Route path={"/signup"} element={<Signup/>}></Route>
        <Route path={"/login"} element={<Login/>}></Route>
        <Route path={"/Review"} element={<Review/>}></Route>
        <Route path={"/Review/:postNo"} element={<ReviewDetail/>}/>
        <Route path={"/reviewEdit/:postNo"} element={<ReviewEdit/>}/>
        <Route path={"/ReviewPost"} element={<ReviewPost/>}/>
        <Route path={"/seeya"} element={<Seeya/>}/>
        <Route path={"/matzip"} element={<Matzip/>}/>
        <Route path={"/musical"} element={<Musical/>}/>
        <Route path={"/concert"} element={<Concert/>}/>
        <Route path={"/mypage"} element={<MyPage/>}/>
        <Route path={"/facility"} element={<Facility/>}/>
        <Route path={"/seeyamain"} element={<SeeyaMain/>}/>
        <Route path="/view-review/:theaterId" element={<SeeyaDetail />} />
        <Route path={`/SeeyaUpload/:theaterId`} element = {<SeeyaUpload/>} />
        <Route path="/view-review/:theaterId/:viewNo" element = {<SeeyaReview/>} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App;