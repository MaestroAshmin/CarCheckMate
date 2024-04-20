import React, { useState } from 'react';
import '../styles/CarAdPage.css';
import CarBuildPage from './CarBuildPage';
import CarFeaturePage from './CarFeaturePage';
import CarPhotoPage from './CarPhotoPage';
import CarLocationPage from './CarLocationPage'
import CarPricePage from './CarPricePage';
export default function CarAdPage() {
    
    const [page, setPage] = useState(0);

    const [formData,setFormData] = useState({
        registration: "abc",
        make:"",
        model:"",
        state:"",
        year:"",
        state:"",
        suburb:"",
        postcode:"",
        price:"",
        color:"",
        odometer:"",
        transmission:"",
        fuelType:"",
        engineType:"",
        bodyType:""
    })

    console.log(formData)
    const FormPages = ["CarBuildPage","CarFeaturePage","CarLocationPage","CarPhotoPage","CarPricePage"]

    const PageDisplay = () => {
        if(page == 0){
            return <CarBuildPage 
            formData={formData} 
            setFormData={setFormData}
            />
        }else if (page == 1){
            return <CarFeaturePage
            formData={formData} 
            setFormData={setFormData}
            />
        }else if (page == 2){
            return <CarLocationPage
            formData={formData} 
            setFormData={setFormData}
            />
        }else if (page == 3){
            return <CarPhotoPage/>
        }else if (page == 4){
            return <CarPricePage
            formData={formData} 
            setFormData={setFormData}
            />
        }
    };
    return(
        <div className="form">
            <div className="progressbar"></div>
            <div className="form-container">
                <div className='header'></div>
                <div className='body'>
                    {PageDisplay()}
                </div>

                <div className='footer--button'>
                    <button
                        disabled={page == 0}
                        onClick={() => {
                            setPage((currPage) => currPage - 1)
                        }}
                    >Prev</button>
                    <button
                        disabled={page == FormPages.length - 1 }
                        onClick={() => {
                            setPage((currPage) => currPage + 1)
                        }}
                    >Next</button>
                </div>
            </div>
            
        </div>
    )
}