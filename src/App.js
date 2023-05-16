import React from 'react';
import Header from './Header';
import { AiOutlineBars } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import Sidebar from './components/Sidebar';
import Main from './screens/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from './screens/Review/Review';
import ReviewDetail from './screens/Review/ReviewDetail';
import ConcertList from './screens/SB_Components/ConcertList';
import MyPage from './screens/My_Page/MyPage';
import Facility from './screens/SB_Components/Facility';
import SeeyaMain from './screens/seeya/SeeyaMain';
import SeeyaDetail from './screens/seeya/SeeyaDetail';
import SeeyaUpload from './screens/seeya/SeeyaUpload';
import SeeyaReview from './screens/seeya/SeeyaReview';
import SeeyaSeat from './screens/seeya/SeeyaSeat';
import Signup from './screens/signup/Signup';
import ReviewEdit from './screens/Review/ReviewEdit';
import Login from './screens/signup/Login';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ReviewPost from "./screens/Review/ReviewPost";
import MusicalList from "./screens/SB_Components/MusicalList";
import ConcertDetail from "./screens/SB_Components/ConcertDetail";
import MusicalDetail from "./screens/SB_Components/MusicalDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path={"/"} element={<Main/>}></Route>
        <Route path={"/signup"} element={<Signup/>}></Route>
        <Route path={"/login"} element={<Login/>}></Route>
        <Route path={"/Review"} element={<Review/>}></Route>
        <Route path={"/Review/:postNo"} element={<ReviewDetail/>}/>
        <Route path={"/reviewEdit/:postNo"} element={<ReviewEdit/>}/>
        <Route path={"/ReviewPost"} element={<ReviewPost/>}/>
        <Route path={"/musicallist"} element={<MusicalList/>}/>
        <Route path={"/musicals/:no"} element={<MusicalDetail/>}/>
        <Route path={"/concertlist"} element={<ConcertList/>}/>
        <Route path={"/concerts/:no"} element={<ConcertDetail/>}/>
        <Route path={"/mypage"} element={<MyPage/>}/>
        <Route path={"/facility"} element={<Facility/>}/>
        <Route path={"/seeyamain"} element={<SeeyaMain/>}/>
        <Route path={"/seeyaSeat"} element={<SeeyaSeat/>}/>
        <Route path="/view-review/:theaterId" element={<SeeyaDetail />} />
        <Route path={`/SeeyaUpload/:theaterId`} element = {<SeeyaUpload/>} />
        <Route path="/view-review/:theaterId/:viewNo" element = {<SeeyaReview/>} />
        
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
