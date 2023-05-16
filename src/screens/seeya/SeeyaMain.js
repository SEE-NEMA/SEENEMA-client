import { Link } from "react-router-dom";
import Header from "../../Header";
import "../styles/SeeyaMain.css";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

function SeeyaMain() {
  const [theaterName, settheaterName] = useState("");
  const [items, setItems] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const searchHandler = () => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/view-review/search?q=${theaterName}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .post(
        `http://43.200.58.174:8080/api/v1/view-review/auth`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setAuthenticated(true);
        console.log(localStorage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="SeeyaMain-Wrap">
        <input
          className="SeeyaMain-input"
          placeholder="공연장 이름을 검색해주세요"
          type="text"
          value={theaterName}
          onChange={(e) => settheaterName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
        />
        <button onClick={searchHandler} className="SeeyaMain-Search">
          <FaSearch size="30" />
        </button>
        <hr className="SeeyaMain-hr" />
      </div>
      <div className="SeeyaMain-itemWrap">
        <ul>
          {items.map((item, index) => (
            <Link
              to={`/view-review/${item.theaterId}`}
              className="SeeyaMain-Link"
              key={index}
            >
              <li className="SeeyaMain-li">{item.theaterName}</li>
            </Link>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export default SeeyaMain;
