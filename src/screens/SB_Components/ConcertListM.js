import React, { useEffect, useState } from "react";
import HeaderM from "../../HeaderM";
import "../styles/ConcertList.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ConcertList () {
    const {no} = useParams();
    const [musical, setMusical] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [musicalsPerPage] = useState(6);

    useEffect(() => {
        axios({
            method:"GET",
            url : "http://43.200.58.174:8080/api/v1/concerts"
        })
        .then((response) => {
            setMusical(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })

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
            <HeaderM/>
            <div className="musical-WrapContentM">
                {currentMusicals.map((concerts) => (
                    <li key={concerts.no} >
                        <Link to={`/concerts/${concerts.no}`} style={{ textDecoration: "none"}}>
                            <img src={concerts.imgUrl} alt={concerts.title} />
                            <div className="musical-titleM">{concerts.title}</div>
                            <div className="musical-placeM">{concerts.place}</div>
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
    )
}

export default ConcertList;
