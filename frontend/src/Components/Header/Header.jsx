import React, { useMemo, useState } from 'react';
import { Container,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../Styles/Header.css';
import { FaPhone } from "react-icons/fa6";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { ClipLoader } from 'react-spinners'




const Header = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  const handleBooking = async () => {
    setIsLoading(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // alert('Slot booked successfully!');
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
    container: (provided) => ({
      ...provided,
      width: '200%',
    }),
    valueContainer: (provided) => ({
      ...provided,
      minWidth: '100px',
      maxWidth: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
  
  return (
    <header className='header'>
    <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header_top_left">
              
                <span className="header_top_help">Need help?
                <a href='tel:+123456789'>
                <button className="header__btn ">
                  <FaPhone className='call-icon'/>
                  {/* <div>Request a call</div> */}
              </button> 
              </a>
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header_top_right d-flex align-items-center justify-content-end gap-3">
                
                <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i>Login
                </Link>

                

                <Link to="/register" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i class="ri-truck-line"></i>                    
                  <span
                     onClick={handleBooking} 
                     isLoading={isLoading}
                     handleBooking={handleBooking}
                     >
                    {isLoading ? <ClipLoader size={20} color={"red"} /> : <span>Book <br />Slot</span>}
                    
                      
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="4" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  {/* <h4>Country</h4> */}
                  <Select options={options} value={value} onChange={changeHandler} 
                  styles={customStyles}/>

                  
                </div>
              </div>
            </Col>

            <Col lg="4" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                <i class="ri-flag-line"></i>
                  </span>
                <div className="header__location-content">
                  <h4>English</h4>
                </div>
              </div>
            </Col>

            {/* <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col> */}
          </Row>
        </Container>
      </div>
    </header>
  )
}

export default Header
