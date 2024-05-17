//import Carousel from 'react-grid-carousel';
//import '../styles/photosslide.css';

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/photosslide.css";

const PhotosSlide = () => {
  const [visitedCars, setVisitedCars] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:3000/cars/available-cars"
      );
      //console.log(response.data); // Check the structure of the data first

      // Format the data before setting it in the state
      const unsoldCars = response.data.map((car) => ({
        car_id: car._id,
        bodyType: car.bodyType,
        color: car.color,
        engineType: car.engineType,
        fuelType: car.fuelType,
        hasBeenSold: car.hasBeenSold,
        make: car.make,
        model: car.model,
        odometer: car.odometer,
        postcode: car.postcode,
        price: car.price,
        seller_id: car.seller_id,
        state: car.state,
        streetName: car.streetName,
        suburb: car.suburb,
        title: car.title,
        transmission: car.transmission,
        year: car.year,
        carPhotos: car.carPhotos, // Split the photo string into an array
        carvisits: car.visits,
      }));

      const sortedUnsoldCars = unsoldCars.sort((c1, c2) => {
        return c2.carvisits - c1.carvisits;
      });
      console.log("sorted unsold cars", sortedUnsoldCars);
      //can update to number of most visted cars here in line 82
      const mostvisitedcars = sortedUnsoldCars.slice(0, 3);
      setVisitedCars([...mostvisitedcars]);
    }
    fetchData();
  }, []);

  return (
    <div className="ctr-photosslide">
      <h1>Most View Vehicles</h1>
      <Slider {...settings}>
        {/* <div className="slide-item">
          <img src="images/car-01.jpg" alt="" />
        </div> */}

        {visitedCars.map((car, index) => (
          <div className="slide-item">
            <img src={car.carPhotos[0]} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/*<img src='images/arrow-icon-left.png' alt='Prev' />*/}
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/*<img src='images/arrow-icon-right.png' alt='Next' />*/}
    </div>
  );
};

export default PhotosSlide;
