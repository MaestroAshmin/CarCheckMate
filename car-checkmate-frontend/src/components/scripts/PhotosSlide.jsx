import Carousel from 'react-grid-carousel';
import '../styles/photosslide.css';

const PhotosSlide = () => {
    return (
        <div className='ctr-photosslide'>
            <div>
                <Carousel cols={4} rows={1} gap={10} autoplay={3000} loop>
                    <Carousel.Item>
                        <img src='images/car-01.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-02.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-03.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-04.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-05.jpg' alt='' />  
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-06.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-07.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-08.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-09.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-10.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-11.jpg' alt='' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='images/car-12.jpg' alt='' />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default PhotosSlide;