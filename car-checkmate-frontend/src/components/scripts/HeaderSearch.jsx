import React from "react";
import '../../pages/styles/main.css';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function HeaderSearch() {
    return (
        <div className='ctr-main-header-search'>
            <input type='text' placeholder='Search...' />
            <FontAwesomeIcon icon={faSearch} className='search-icon' />
        </div>
    );
}