import { Link } from "react-router-dom";
import Header from "../../Header";
import "../styles/SeeyaSeatMain.css";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

function SeeyaSeatMain() {
  const [theaterName, setTheaterName] = useState("");
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get("http://43.200.58.174:8080/api/v1/seats");
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchHandler = () => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/seats/search?q=${theaterName}`)
      .then((response) => {
        setItem(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const getItemsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return item.slice(startIndex, endIndex);
  };


  const Pagination = () => {
    const totalPages = Math.ceil(item.length / pageSize);

    const handleClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    };

    return (
        <div className="Pagination">
        <div className="Pagination-buttons">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="SeeyaMain-Wrap">
        <input
          className="SeeyaMain-input"
          placeholder="공연장 이름을 검색해주세요"
          type="text"
          value={theaterName}
          onChange={(e) => setTheaterName(e.target.value)}
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
  {getItemsForCurrentPage().map((item, index) => (
    <Link
    to={`/seeyaSeat${item.theaterId === 12 ? 'BlueSquare' : item.theaterId === 30 ? 'Chungmu' : item.theaterId === 11 ? 'MasterCard': item.theaterId === 37 ? '' : 'BlueSquare'}/${item.theaterId}`}
      
      className="SeeyaMain-Link"
      key={index}
    >
      <li className="SeeyaMain-li">{item.theaterName}</li>
    </Link>
  ))}
</ul>
      </div>
      <Pagination />
    </div>
  );
}

export default SeeyaSeatMain;