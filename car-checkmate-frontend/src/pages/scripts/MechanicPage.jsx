import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CarData from './CarData.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/MechanicPage.css';
import Navbar from '../../components/scripts/navbar';
import Footer from '../../components/scripts/footer';
import HeaderNav from '../../components/scripts/HeaderNav'

export default function MechanicPage() {
    const [data, setData] = useState([]);
    const { itemId } = useParams();
    const carId = parseInt(itemId);

    const [car, setCar] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [comment, setComment] = useState("");


    const images = ['/dumy1.jpg','/dumy2.png','/dumy3.png','/dumy4.png','/dumy5.png']

    const carImages= () => {
        return(
            <div className='pic-container'>
                <div>
                    <img src={images[0]} className='main-pick'/>
                </div>
                <div className='sidepic-container'>
                    <img src={images[1]} className='side-picks'/>
                    <img src={images[2]} className='side-picks'/>
                    <img src={images[3]} className='side-picks'/>
                    <img src={images[4]} className='side-picks'/>
                    
                </div>
            </div>
        )
    }

    const [selectedOption, setSelectedOption] = useState("build");

    const handleBuild = () => {
        setSelectedOption("build");
    };

    const handleAddress = () => {
        setSelectedOption("address");
    };

    const handleFeature = () => {
        setSelectedOption("features");
    };

    const handlePrice = () => {
        setSelectedOption("price");
    };
    const renderDetails = () => {
        if (selectedOption === "build") {
            return (
                <div className='mec-info'>
                    <p className='para'><strong>Car ID: </strong>{car.id}</p>
                    <p className='para'><strong>Make: </strong>{car.make}</p>
                    <p className='para'><strong>Model:</strong> {car.model}</p>
                    <p className='para'><strong>Year:</strong> {car.year}</p>
                </div>
            );
        } else if (selectedOption === "address") {
            return (
                <div className='mec-info'>

                        <p className='para'><strong>Street:</strong> {car.street}</p>
                        <p className='para'><strong>Suburb:</strong> {car.suburb}</p>

                        <p className='para'><strong>Postcode:</strong> {car.postcode}</p>
                        <p className='para'><strong>State:</strong> {car.state}</p>

                </div>
            );
        } else if (selectedOption === "features") {
            return (
                <div className='mec-info'>
      
                    <div className='div2'>
                        <p className='para'><strong>Color:</strong> {car.color}</p>
                        <p className='para'><strong>Odometer:</strong> {car.odometer}</p>
                    </div>
                    <div className='div2'>
                        <p className='para'><strong>Transmission:</strong> {car.transmission}</p>
                        <p className='para'><strong>Body type:</strong> {car.body_type}</p>
                    </div>
                    <div className='div2'>
                        <p className='para'><strong>Engine type:</strong> {car.engine_type}</p>
                        <p className='para'><strong>Fuel type:</strong> {car.fuel_type}</p>
                    </div>
  
                </div>
            );
        }

        else if (selectedOption === "price") {
            return(
                <div className='div2'>
              
                <p className='para'><strong>Price:</strong> {car.price}</p>
            </div>
            )
        }
    };

    const carDetails = () => {
        return (
            <div className='car-detailz'>
                {car ? (
                    <div>
                    <div>
                        <button onClick={handleBuild}  class="button-17" role="button">Build</button>
                        <button onClick={handleAddress }class="button-17" role="button">Address</button>
                        <button onClick={handleFeature}class="button-17" role="button">Features</button>
                        <button onClick={handlePrice}class="button-17x" role="button">Price</button>
                    </div>
                    <div className='renderDetails'>
                    {renderDetails()}
                    </div>
                    </div>
                ) : (
                    <p>No car found with the specified ID.</p>
                )}
            </div>
        );
    };
    

    useEffect(() => {
        setData(CarData); // Add status field to each item
    }, []);

    useEffect(() => {
        const selectedCar = data.find(item => item.id === carId);
        setCar(selectedCar);
    }, [carId, data]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleConfirmBooking = () => {
        console.log(
            car.id,
            car.make,
            car.model,
            selectedDate
        );
    };

    return (
        <div className='bMechanic-container'>
            <HeaderNav/>
          
            {carImages()}
            <h2 className='hpara'>Car Details</h2>
            {carDetails()}
            <div className='date-container'>
                <h3 className='hpara'>Select Date and Time For Inspection</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy; hh:mm"
                    placeholderText='mm/dd/yyyy hh:mm'
                    showTimeSelect
                    timeIntervals={15}
                    timeFormat='h:mm aa'
                    className='datepicker'
                />
            </div>
             
            <button className="button-81" role="button" onClick={handleConfirmBooking}>Confirm Booking</button>
            <Footer />
        </div>
    );
}
