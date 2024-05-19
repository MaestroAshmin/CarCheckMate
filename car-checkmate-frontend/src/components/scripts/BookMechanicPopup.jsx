import React,{useState} from "react"; 

export default function BookMechanicPopup({ showBookMechanicPopup, setShowBookMechanicPopup }) {
const [bookData,setBookData ]= useState({Date: "", Time: ""})


const handleDate=(e) => { 
    console.log("date ",e.target.value)
}
const handleTime=(e) => { 
    console.log("time ",e.target.value)
}

const handleBookInspection = async() =>{
    try{ await fetch(`http://localhost:3000/inspections/inspection-form/${showBookMechanicPopup}`,{
            method:"POST", 
            headers:{
                "Content-Type" : "application/json",
            },

            body:JSON.stringify({
                inspectionDate: bookData.Date,
                inspectionTime: bookData.Time
            })

        })
            
        } catch (error) {
            console.log("error while booking inspection : ", error)
        }
}

    return (
        <>
            {showBookMechanicPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowBookMechanicPopup(false)}>&times;</span>
                            <h2>Book A Mechanic Inspection</h2>
                                <p>Car ID: <span>{showBookMechanicPopup}</span></p>
                                <p>Enter a preferred date and time.</p>
                                <br />
                                <div className='ctr-unlock-profile'>
                                    <form>
                                        <label htmlFor='requestDate'>Date:</label>
                                        <input type="date" name="requestDate" required  onChange={handleDate}/>
                                        <label htmlFor='requestTime'>Time:</label>
                                        <input type="time" name="requestDate" required onChange={handleTime} />

{/* if someone works here and you use the below <select> instead of <input> above,
so we can limit the time to be selected only from 8.00 to 20.00 :) */}

                                        {/*<select className="custom-select" onChange={handleTime} required>
                                            {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => (
                                                <option key={hour} value={hour.toString().padStart(2, '0') + ':00'}>
                                                    {hour.toString().padStart(2, '0') + ':00'}
                                                </option>
                                            ))}
                                          </select>*/}

                                        <br />
                                        <div className='button-container'>
                                            <button type='submit' onClick={handleBookInspection}>Book</button>
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