import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the default CSS

export default function BookSellerPopup({ showBookSellerPopup, setShowBookSellerPopup }) {
    const [startDate, setStartDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState('09:00');

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 1 && day !== 4;
    };

    return (
        <>
            {showBookSellerPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowBookSellerPopup(false)}>&times;</span>
                            <h2>Book An Inspection</h2>
                            <p>Car ID: <span>CT1234</span></p>
                            <p>Enter a preferred date and time.</p>
                            <br />
                            <div className='ctr-unlock-profile'>
                                <form>
                                    <label htmlFor='requestDate'>Date:</label>
                                    <div className='custom-datepicker'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            filterDate={isWeekday}
                                            placeholderText="Select a weekday"
                                            required
                                        />
                                    </div>
                                    <label htmlFor='requestTime'>Time:</label>
                                    <select className="custom-select" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)} required>
                                        {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => (
                                            <option key={hour} value={hour.toString().padStart(2, '0') + ':00'}>
                                                {hour.toString().padStart(2, '0') + ':00'}
                                            </option>
                                        ))}
                                    </select>
                                    <br />
                                    <div className='button-container'>
                                        <button type='submit'>Book</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}