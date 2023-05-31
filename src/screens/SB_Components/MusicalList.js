import React, { useEffect, useState } from "react";
import Header from "../../Header";
import "../styles/MusicalList.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function MusicalList() {
  const [musical, setMusical] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [musicalsPerPage] = useState(6);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://43.200.58.174:8080/api/v1/musicals"
    })
      .then((response) => {
        setMusical(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const indexOfLastMusical = currentPage * musicalsPerPage;
  const indexOfFirstMusical = indexOfLastMusical - musicalsPerPage;
  const currentMusicals = musical.slice(indexOfFirstMusical, indexOfLastMusical);
  const totalMusicals = musical.length;
  const totalPages = Math.ceil(totalMusicals / musicalsPerPage);
  const maxPagesToShow = 5;
  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className="musical-WrapContent">
        {currentMusicals.map((musicals) => (
          <li key={musicals.no}>
            <Link to={`/musicals/${musicals.no}`} key={musicals.no}>
              <img src={musicals.imgUrl} alt={musicals.no} />
              <h4>{musicals.title}</h4>
              <h6>{musicals.place}</h6>
            </Link>
          </li>
        ))}
      </div>
      <div className="pagination">
        {hasPreviousPage && (
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage - 1)}
          >
            {"<"}
          </button>
        )}
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <button
            key={startPage + index}
            className={`pagination-button ${currentPage === startPage + index ? "active" : ""}`}
            onClick={() => paginate(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
        {hasNextPage && (
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage + 1)}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default MusicalList;
