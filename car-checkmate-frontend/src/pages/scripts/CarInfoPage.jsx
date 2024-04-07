import React from 'react';
import '../styles/CarInfoPage.css';
import Navbar from '../../components/scripts/navbar';
import SearchBar from '../../components/scripts/searchbar';

export default function CarInfoPage() {
    return(
        <div className="container">
            <Navbar/>
            <SearchBar/>
            <h1>Cars</h1>
        </div>
    )
}
