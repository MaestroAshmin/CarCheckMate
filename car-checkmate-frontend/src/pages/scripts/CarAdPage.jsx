import React, { useState } from 'react';
import '../styles/CarAdPage.css';
import CarBuildPage from './CarBuildPage';
import CarFeaturePage from './CarFeaturePage';
import CarPhotoPage from './CarPhotoPage';
import CarLocationPage from './CarLocationPage';
import CarPricePage from './CarPricePage';

export default function CarAdPage() {
    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        registration: "abc",
        make:"",
        model:"",
        state:"",
        year:"",
        street:"",
        suburb:"",
        postcode:"",
        price:"",
        color:"",
        odometer:"",
        transmission:"",
        fuelType:"",
        engineType:"",
        bodyType:"",
        images:""
    });

    const FormPages = ["CarBuildPage","CarFeaturePage","CarLocationPage","CarPhotoPage","CarPricePage"];

    const PageDisplay = () => {
        if(page === 0){
            return <CarBuildPage formData={formData} setFormData={setFormData} />;
        } else if (page === 1){
            return <CarFeaturePage formData={formData} setFormData={setFormData} />;
        } else if (page === 2){
            return <CarLocationPage formData={formData} setFormData={setFormData} />;
        } else if (page === 3){
            return <CarPhotoPage formData={formData} setFormData={setFormData} />;
        } else if (page === 4){
            return <CarPricePage formData={formData} setFormData={setFormData} />;
        }
    };

    const progress = ((page + 1) / FormPages.length) * 100; 
    return (
        <div className='car-ad-container'>
            <div className="form">

                <div>
                    <img src="logo.png"/>
                </div>
                <div className="form-container">
                    {PageDisplay()}
                </div>

                <div className='footer--button'>
                    {page === 0 ? (
                        <button class="button-31" role="button"
                            disabled={page === FormPages.length - 1}
                            onClick={() => setPage((currPage) => currPage + 1)}
                        >Next</button>
                    ) : (
                        <>
                            <button class="button-6" role="button"
                                onClick={() => setPage((currPage) => currPage - 1)}
                            >Prev</button>
                            <button class="button-31" role="button"
                                onClick={() => {
                                if (page === FormPages.length - 1) {
                                    alert("FORM SUBMITTED");
                                    console.log(formData);
                                } else {
                                    setPage((currPage) => currPage + 1);
                                }
                                }}
                            >
                                {page === FormPages.length - 1 ? "Submit" : "Next"}
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
        
      
    );
}
