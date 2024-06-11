import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/HeroSlider.css'
import { ClipLoader } from 'react-spinners';

const HeroSlider = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate()

  const handleBooknow = async () => {
    setIsLoading(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/login');
    setIsLoading(false);
    // alert('Slot booked successfully!');
  };

    const settings = {
        fade: true,
        speed: 2000,
        autoplaySpeed: 5000,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
      };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider_item slider_item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h1 className=" mb-4 hero-text">Book Now and Save Time</h1>

            <button className="btn reserve__btn mt-4"
            onClick={handleBooknow}
            disabled={isLoading} >
              {isLoading ? <ClipLoader size={20} color={"white"} /> : <span className="booknow" >Book Now</span> }
            </button>
            
          </div>
        </Container>
      </div>

      <div className="slider_item slider_item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h1 className=" mb-4 hero-text">Book Now and Save Time</h1>

            <button className="btn reserve__btn mt-4"
            onClick={handleBooknow}
            disabled={isLoading} >
              {isLoading ? <ClipLoader size={20} color={"red"} /> : <span className="booknow" >Book Now</span> }
            </button>
            
          </div>
        </Container>
      </div>

      <div className="slider_item slider_item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h1 className=" mb-4 hero-text">Book Now and Save Time</h1>

            <button className="btn reserve__btn mt-4"
            onClick={handleBooknow}
            disabled={isLoading} >
              {isLoading ? <ClipLoader size={20} color={"red"} /> : <span className="booknow" >Book Now</span> }
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  )
}

export default HeroSlider;
