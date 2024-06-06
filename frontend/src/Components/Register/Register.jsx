import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,

}
from 'mdb-react-ui-kit';
import '../Register/Register.css';
import registerimg from '../../Assets/all-images/truck-img/dockhd.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';





function Register() {
  const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userid || !password || !cpassword){
          setLoginError('Please enter both userid and password')
          return;
        }
        if( password !== cpassword){
          setLoginError('Passwords does not match')
          return;
        }
        setIsLoading(true);
        axios.post('http://localhost:5000/signup',{userid, password, cpassword})
        .then(result => {
          console.log(result)
          setIsLoading(false);
            navigate('/login')
        })
        .catch(error => {
          console.log('axios error:',error)
          if(error.response && error.response.data && error.response.data.error){
            setLoginError(error.response.data.error)
          }
          else{
            setLoginError('error occured please try again')
          }
        }) 
    }

  return (
    <>
    <Header />
    <MDBContainer fluid className='my-1'>

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

            <div className='d-flex justify-content-center align-items-center '>
         <div className='bg-white p-3 rounded w-50'>
         <h2>Sign-Up</h2>
         
         <form onSubmit={handleSubmit}>
            
                <div className='mb-3'>
                    <label>User ID:</label>
                    <input 
                    type="text" 
                    name='userid' 
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    className='form-control rounded-0'
                    />
                </div>
                <div className='mb-3'>
                    <label>Password:</label>
                    <input 
                    type="password" 
                    name='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control rounded-0'
                      />
                </div>
                <div className='mb-3'>
                    <label>Confirm Password:</label>
                    <input 
                    type="password" 
                    name='cpassword' 
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    className='form-control rounded-0'
                    />
                </div>
                <button 
                type="submit" 
                className='btn btn-success w-100 rounded-0'  
                style={{background: '#7c5f87'}}
                disabled={isLoading}
                >
                    {isLoading ? <ClipLoader size={20} color={"#ffffff"} /> : 'Signup'}
                    </button>
                    {loginError && <p style={{color: "red"}}>{loginError}</p>}
                
            </form>
            
            <p style={{color: 'blue'}}>Already have a account</p>
            <Link to='/login' type="submit"
            className='btn btn-default border w-100 rounded-0 text-decoration' style={{background: '#7c5f87'}}
            >Login</Link>
    
            </div>
    </div>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src={registerimg} class="w-100 rounded-4 shadow-4"
            alt="truck-images" fluid/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    <Footer />
    </>
  );
}

export default Register;
