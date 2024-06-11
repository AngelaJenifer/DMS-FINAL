import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import video1 from '../../Assets/all-images/truck-img/truckhd.webp';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';

function Login() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userid || !password) {
      setLoginError('Please enter both userid and password');
      return;
    }
    axios.post('http://localhost:5000/login', { userid, password })
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          navigate('/tracking');
        } else {
          setLoginError(result.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        setLoginError("Error occurred, please try again later");
      });
  };

  return (
    <>
      <Header />
      <MDBContainer className="my-5 login-container">
        <MDBCard className="card-custom">
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src={video1} alt="login form" className='rounded w-100  transparent-image' />
            </MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column justify-content-center'>
                <div className='login-box'>
                  <h2 className='login-title'>Login</h2>
                  <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                    <label>User ID</label>
                    
                      <input 
                      label="User ID" 
                        type="text" 
                        className='form-control form-control-custom' 
                        value={userid} 
                        onChange={(e) => setUserid(e.target.value)} 
                      />
                    </div>
                    <div className='mb-4'>
                      <label>Password</label>
                      <input 
                         
                        type="password" 
                        className='form-control form-control-custom' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                    </div>
                    <MDBBtn type="submit" className='btn btn-custom w-100'>Login</MDBBtn>
                    {loginError && <p className='login-error'>{loginError}</p>}
                  </form>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
}

export default Login;