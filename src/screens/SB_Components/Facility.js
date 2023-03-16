import React, { useState } from "react";
import Header from "../../Header";
import "../styles/Facility.css"
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';

function Facility() {
   
    const options = [
        '주변 맛집',
        '부대 시설',
      ];
      const [selectedOption, setSelectedOption] = useState(options[0]);
    
      const handleDropdownChange = (selected) => {
        setSelectedOption(selected.value);
      };
        
    return (
        <div>
            <Header/>
            <div className = "dropdown-wrapper">
            <h1>React Dropdown Example</h1>
                <Dropdown options={options} onChange={handleDropdownChange} value={selectedOption} placeholder="Select an option" />
            </div>
        </div>
    )
}

export default Facility;