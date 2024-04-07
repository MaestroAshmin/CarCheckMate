import React from 'react';
import '../styles/CarInfoPage.css';
import Navbar from '../../components/scripts/navbar';
import SearchBar from '../../components/scripts/searchbar';
import Footer from '../../components/scripts/footer'
export default function CarInfoPage() {
    return(
        <div className="container">
            <Navbar/>
            <SearchBar/>
            <div className='inner--container'>
                <div className='car--container'>
                    <img  className='images' src="background.png"/>
                    <div className='images--controller'>
                        <button >&#8249;</button>
                        <button >&#8250;</button>
                    </div>
                </div>
                <div className='option--container'>
                    <p className='option'>Price <br/> $7500</p>
                    <p className='option'>Buy <br/> Car</p>
                    <p className='option'>Book <br/> inspection</p>
                    <p className='option'>Hire <br/> Mechanic</p>
                </div>
            </div>
            <div className='detail--container'>
                <div>
                    <h1>Details</h1>
                </div>
                <div>
                    <h1>Features</h1>
                </div>
                <div>
                    <h1>Specs</h1>
                </div>
            </div>
        </div>
    )
}
