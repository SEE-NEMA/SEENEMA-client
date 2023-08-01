import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import '../screens/styles/SearchBar.css';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      props.onSearch(searchTerm);
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="Main-Search-Bar">
          <input
            className = "Main-Search-Bar-input"
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleChange}
          /> &nbsp;&nbsp;
          <button type="submit">
            <FaSearch />
          </button>
        </div>
      </form>
    );
  }

  export default SearchBar;