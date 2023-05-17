import React from 'react';
import Header from './Header';
import { AiOutlineBars } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import Sidebar from './components/Sidebar';
import Main from './screens/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from './screens/Review/Review';
import Perform_Review from './screens/Review/ReviewWrite';
import Signup from './screens/Signup'
import Seeya from './screens/SB_Components/Seeya';
import Matzip from './screens/SB_Components/Matzip';
import Musical from './screens/SB_Components/Musical';
import Concert from './screens/SB_Components/Concert';
import MyPage from './screens/My_Page/MyPage';
import Facility from './screens/SB_Components/Facility';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path={"/"} element={<Main/>}></Route>
        <Route path={"/signup"} element={<Signup/>}></Route>
        <Route path={"/login"} element={<Login/>}></Route>
        <Route path={"/Review"} element={<Review/>}></Route>
        <Route path={"/seeya"} element={<Seeya/>}/>
        <Route path={"/matzip"} element={<Matzip/>}/>
        <Route path={"/perform_review"} element={<Perform_Review/>}/>
        <Route path={"/musical"} element={<Musical/>}/>
        <Route path={"/concert"} element={<Concert/>}/>
        <Route path={"/mypage"} element={<MyPage/>}/>
        <Route path={"/facility"} element={<Facility/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
