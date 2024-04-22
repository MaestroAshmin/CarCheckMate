import React , {useState}from 'react';
import Select from 'react-select';
import '../styles/CarPricePage.css'

export default function CarPricePage({ formData, setFormData }) {
    return(
        <div>
                <div className='price-input-box'>
                <label className='labels'>Price</label>
                    <input
                    
                        type="text"   
                        name="registration"   
                        className='price-input'  
                        value={formData.price}
                        onChange={(e) => {
                            setFormData({ ...formData, price: e.target.value });
                          }}       
                    />
                </div>
 
        </div>
    )
}