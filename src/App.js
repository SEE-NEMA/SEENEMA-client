import React from 'react';
import Header from './Header';
import { AiOutlineBars } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import Main from './screens/Main';
import MainM from './screens/MainM';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Review from './screens/Review/Review';
import ReviewM from './screens/Review/ReviewM';
import ReviewDetail from './screens/Review/ReviewDetail';
import ConcertList from './screens/SB_Components/ConcertList';
import ConcertListM from './screens/SB_Components/ConcertListM';
import MyPage from './screens/My_Page/MyPage';
import Facility from './screens/SB_Components/Facility';
import SeeyaMain from './screens/seeya/SeeyaMain';
import SeeyaMainM from './screens/seeya/SeeyaMainM';
import SeeyaDetail from './screens/seeya/SeeyaDetail';
import SeeyaDetailM from './screens/seeya/SeeyaDetailM';
import SeeyaUpload from './screens/seeya/SeeyaUpload';
import SeeyaUploadM from './screens/seeya/SeeyaUploadM';
import SeeyaReview from './screens/seeya/SeeyaReview';
import SeeyaReviewM from './screens/seeya/SeeyaReviewM';
import SeeyaSeat from './screens/seeya/SeeyaSeat';
import SeeyaSeatBlueSquare from './screens/seeya/SeeyaSeatBlueSquare';
import SeeyaSeatChungmu from './screens/seeya/SeeyaSeatChungmu';
import SeeyaEdit from './screens/seeya/SeeyaEdit';
import SeeyaSeatMain from './screens/seeya/SeeyaSeatMain';
import SeeyaSeatList from './screens/seeya/SeeyaSeatList';
import SeeyaSeatEdit from './screens/seeya/SeeyaSeatEdit';
import SeeyaSeatUpload from './screens/seeya/SeeyaSeatUpload';
import SeeyaSeatTicket from './screens/seeya/SeeyaSeatTicket';
import SeeyaSeatMasterCard from './screens/seeya/SeeyaSeatMasterCard';
import Signup from './screens/signup/Signup';
import ReviewEdit from './screens/Review/ReviewEdit';
import Login from './screens/signup/Login';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ReviewPost from "./screens/Review/ReviewPost";
import MusicalList from "./screens/SB_Components/MusicalList";
import MusicalListM from "./screens/SB_Components/MusicalListM";
import ConcertDetail from "./screens/SB_Components/ConcertDetail";
import ConcertDetailM from "./screens/SB_Components/ConcertDetailM";
import MusicalDetail from "./screens/SB_Components/MusicalDetail";
import MusicalDetailM from "./screens/SB_Components/MusicalDetailM";
import RecommendMain from "./screens/SB_Components/Recommend/RecommendMain"
import MapMain from "./screens/maps/MapMain"


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
        <Route path={"/RecommendMain"} element={<RecommendMain/>}/>
        <Route path={"/seeyamain"} element={<SeeyaMain/>}/>
        <Route path="/view-review/:theaterId" element={<SeeyaDetail />} />
        <Route path={`/SeeyaUpload/:theaterId`} element = {<SeeyaUpload/>} />
        <Route path="/view-review/:theaterId/:viewNo" element = {<SeeyaReview/>} />
        <Route path="seeyaedit/:theaterId/:viewNo" element = {<SeeyaEdit/>}/>
        <Route path="/SeeyaSeatList/:theaterId/:z/:x/:y" element = {<SeeyaSeatList/>}/>
        <Route path={"/seeyaSeat/:theaterId"} element={<SeeyaSeat/>}/>
        <Route path={"/seeyaseatupload/:theaterId/:z/:x/:y"} element={<SeeyaSeatUpload/>}/>
        <Route path={"/seeyaseatticket/:theaterId/:z/:x/:y"} element={<SeeyaSeatTicket/>}/>
        <Route path={"/seeyaSeatBluesquare/:theaterId"} element ={<SeeyaSeatBlueSquare/>}/>
        <Route path={"/seeyaSeatMasterCard/:theaterId"} element ={<SeeyaSeatMasterCard/>}/>
        <Route path={"/seeyaSeatChungmu/:theaterId"} element ={<SeeyaSeatChungmu/>}/>
        <Route path={"/seeyaseatmain"} element={<SeeyaSeatMain/>}/>
        <Route path={"/seeyaseatedit/:theaterId/:z/:x/:y/:viewNo"} element = {<SeeyaSeatEdit/>}/>
        <Route path={"/MapMain"} element={<MapMain/>}/>
        <Route path={"/M"} element={<MainM/>}/>
        <Route path={"/musicalListM"} element={<MusicalListM/>}/>
        <Route path={"/musicalsM/:no"} element={<MusicalDetailM/>}/>
        <Route path={"/concertsM/:no"} element={<ConcertDetailM/>}/>
        <Route path={"/concertListM"} element={<ConcertListM/>}/>
        <Route path={"/seeyamainM"} element={<SeeyaMainM/>}/>
        <Route path="/view-reviewM/:theaterId" element={<SeeyaDetailM/>}/>
        <Route path={`/SeeyaUploadM/:theaterId`} element = {<SeeyaUploadM/>} />
        <Route path="/view-reviewM/:theaterId/:viewNo" element = {<SeeyaReviewM/>} />
        <Route path={"/ReviewM"} element={<ReviewM/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;