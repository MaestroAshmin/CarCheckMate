import React, { useState } from 'react';
import '../styles/searchbar.css';
import { FaSearch } from "react-icons/fa";
var data = require("./MockSearchData.json")

export default function SearchBar() {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onSearch = (input) =>{
        setValue(input)
        console.log(input)
    }

    return(
        <div>
            <div>
                <div className='search-container'>
                    <div className='search-inner'>
                        <input type="text" className='search--input' value={value} onChange={onChange} placeholder='Search'/>

                    <div className={`dropdown ${value ? 'show-border' : ''}`}>
                        {data.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const fullname = item.fullname.toLowerCase(); // Add parentheses to call the method

                            return searchTerm && fullname.startsWith(searchTerm) && fullname !== searchTerm;
                        })
                        .slice(0,10)
                        .map((item, index) => (
                            <div 
                                onClick={() => onSearch(item.fullname)}
                                className='dropdown-row' 
                                key={index}
                            >
                                {item.fullname}
                            </div>
                        ))}
                    </div>
                </div>
                <div><FaSearch /></div>
                </div>
            </div>
        </div>
    )
}
