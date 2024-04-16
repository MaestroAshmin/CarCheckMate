import React, { useState } from 'react';
import '../styles/searchbar.css';
import { FaSearch } from "react-icons/fa";

const data = require("./MockSearchData.json");

export default function SearchBar() {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (input) => {
    setValue(input);
    console.log(input);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search--input"
        value={value}
        onChange={onChange}
        placeholder="Search"
      />
      <FaSearch onClick={() => onSearch(value)} />
      <div className={`dropdown ${value ? 'show-border' : ''}`}>
        {data.filter((item) => {
          const searchTerm = value.toLowerCase();
          const fullname = item.fullname.toLowerCase();
          return searchTerm && fullname.startsWith(searchTerm) && fullname !== searchTerm;
        })
        .slice(0, 10)
        .map((item, index) => (
          <div
            onClick={() => onSearch(item.fullname)}
            className="dropdown-row"
            key={index}
          >
            {item.fullname}
          </div>
        ))}
      </div>
    </div>
  );
}