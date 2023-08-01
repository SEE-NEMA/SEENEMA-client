import React from 'react';
import Header from './Header';
import { AiOutlineBars } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
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
import SeeyaMain from './screens/seeya/SeeyaMain';
import SeeyaDetail from './screens/seeya/SeeyaDetail';
import SeeyaUpload from './screens/seeya/SeeyaUpload';
import SeeyaReview from './screens/seeya/SeeyaReview';
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
import ConcertDetail from "./screens/SB_Components/ConcertDetail";
import MusicalDetail from "./screens/SB_Components/MusicalDetail";
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
        <Route path={"/seeya"} element={<Seeya/>}/>
        <Route path={"/matzip"} element={<Matzip/>}/>
        <Route path={"/perform_review"} element={<Perform_Review/>}/>
        <Route path={"/musical"} element={<Musical/>}/>
        <Route path={"/concert"} element={<Concert/>}/>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;