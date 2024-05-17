import React, { useState } from "react";
import "../styles/main.css";
import "../styles/content.css";
import HeaderNav from "../../components/scripts/HeaderNav";
import HeaderSearch from "../../components/scripts/HeaderSearch";
import Footer from "../../components/scripts/footer";
import HeaderFilters from "../../components/scripts/HeaderFilters";
import PhotosSlide from "../../components/scripts/PhotosSlide";
import CarList from "../../components/scripts/CarList";
import Information from "../../components/scripts/Information";
import SearchResults from "../scripts/Listing//searchResults";

export default function Homepage() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  return (
    <div className="ctr-main">
      <div className="ctr-sub-content">
        <HeaderNav />
        {/* <HeaderSearch /> */}
        <br />
        <HeaderFilters onSearch={handleSearchResults} />
        {/* {searchResults.length > 0 ? */}
        <SearchResults searchResults={searchResults} noPerPage={6} />
        <PhotosSlide />
        <CarList noPerPage={6} />
        <Information />
      </div>
      <Footer />
    </div>
  );
}
