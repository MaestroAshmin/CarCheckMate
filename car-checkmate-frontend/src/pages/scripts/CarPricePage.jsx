import React , {useState}from 'react';
import Select from 'react-select';

export default function CarPricePage({ formData, setFormData }) {
    return(
        <div>
                <div className='reg-input-box'>
                <label>Price</label>
                    <input
                        type="text"   
                        name="registration"   
                        className='reg-input'  
                        value={formData.price}
                        onChange={(e) => {
                            setFormData({ ...formData, price: e.target.value });
                          }}       
                    />
                </div>
 
        </div>
    )
}