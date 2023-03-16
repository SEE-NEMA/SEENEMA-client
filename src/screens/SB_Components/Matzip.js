import React, { useState } from "react";
import Header from "../../Header";
import "../styles/Matzip.css"
import { FaSearch } from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {TabContent} from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function Matzip()
{
    let [clickedTab, setClickedTab] = useState(0);
    //value = ["한식", "양식", "중식", "아시안", "이탈리안", "분식", "카페&디저트"];

    function TabContent(props) {
        if(props.clickedTab === 0) {
            return (<TabContent className="mt-5">한식</TabContent>)
        }
        else if (props.clickedTab === 1) {
            return (<TabContent className="mt-5">양식</TabContent>)
        }
        else if (props.clickedTab === 2) {
            return (<TabContent className="mt-5">중식</TabContent>)
        }
        else if (props.clickedTab === 3) {
            return (<TabContent className="mt-5">아시안</TabContent>)
        }
        else if (props.clickedTab === 4) {
            return (<TabContent className="mt-5">이탈리안</TabContent>)
        }
        else if (props.clickedTab === 5) {
            return (<TabContent className="mt-5">분식</TabContent>)
        }
        else if (props.clickedTab === 6) {
            return (<TabContent className="mt-5">카페&amp;디저트</TabContent>)
        }
    }

    return (
        <div>
            <Header/>
            <div className="Matzip-Container">
            <div>
                <input className="Matzip_SearchBar" placeholder="지역 혹은 식당 이름을 검색해주세요"></input>
                <FaSearch className="Matzip_Search"/>
            </div>
            
            <Nav className="mt-5 mb-3 tabs" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-0" onClick={()=>{setClickedTab(0)}}>한식</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-1" onClick={()=>{setClickedTab(1)}}>양식</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-2" onClick={()=>{setClickedTab(2)}}>중식</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-3" onClick={()=>{setClickedTab(3)}}>아시안</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-4" onClick={()=>{setClickedTab(4)}}>이탈리안</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-5" onClick={()=>{setClickedTab(5)}}>분식</Nav.Link>
                </Nav.Item>
                <Nav.Item className = "Matzip-Nav-item">
                    <Nav.Link className="tab_bar" eventkey="link-6" onClick={()=>{setClickedTab(6)}}>카페&amp;디저트</Nav.Link>
                </Nav.Item>
            </Nav>
           
            <TabContent clickedTab={clickedTab}/>
            <hr className="Matziphr"/>
            </div>
        </div>
    )
}

export default Matzip;