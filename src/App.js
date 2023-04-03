import React, { useState } from 'react';
import Header from './Header';
import { AiOutlineBars } from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import Sidebar from './components/Sidebar';
import Main from './screens/Main';
import {BrowserRouter,Switch, Route, Routes} from "react-router-dom";
import Login from './screens/Login';
import Review from './screens/Review/Review';
import Perform_Review from './screens/Review/ReviewWrite';
import Signup from './screens/Signup'
import Matzip from './screens/SB_Components/Matzip';
import Musical from './screens/SB_Components/Musical';
import Concert from './screens/SB_Components/Concert';
import MyPage from './screens/My_Page/MyPage';
import Facility from './screens/SB_Components/Facility';
import ReviewDetail from './screens/Review/ReviewDetail';
import ReviewEdit from './screens/Review/ReviewEdit';
import SeeyaMain from './screens/seeya/SeeyaMain';
import SeeyaDetail from './screens/seeya/SeeyaDetail';
import MusicalDetail from './screens/SB_Components/MusicalDetail';

function App ()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main/>}></Route>
        <Route path={"/Login"} element={<Login/>}></Route>
        <Route path={"/Signup"} element={<Signup/>}></Route>
        <Route path={"/Review"} element={<Review/>}></Route>
        <Route path={"/seeya"} element={<SeeyaMain/>}/>
        <Route path={"/Seeya/:theaterId"} element={<SeeyaDetail/>}/>
        <Route path={"/matzip"} element={<Matzip/>}/>
        <Route path={"/perform_review"} element={<Perform_Review/>}/>
        <Route path={"/musical"} element={<Musical/>}/>
        <Route path={"/concert"} element={<Concert/>}/>
        <Route path={"/mypage"} element={<MyPage/>}/>
        <Route exact path={"/facility"} element={<Facility/>}/>
        <Route exact path={"/Review/:postNo"} element={<ReviewDetail/>}/>
        <Route exact path={"/reviewEdit/:postNo"} element={<ReviewEdit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;