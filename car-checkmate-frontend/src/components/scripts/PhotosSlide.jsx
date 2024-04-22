//import Carousel from 'react-grid-carousel';
//import '../styles/photosslide.css';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/photosslide.css';

const PhotosSlide = () => {
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

    return (
        <div className='ctr-photosslide'>
            <Slider {...settings}>
                <div className='slide-item'>
                    <img src='images/car-01.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-02.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-03.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-04.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-05.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-06.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-07.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-08.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-09.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-10.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-11.jpg' alt='' />
                </div>
                <div className='slide-item'>
                    <img src='images/car-12.jpg' alt='' />
                </div>
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