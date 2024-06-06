import React from 'react';
import{ Routes, Route,Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import Nav from '../Components/UI/Nav';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Calendar from '../Components/UI/Calender';
import Tracking from '../Pages/Tracking';
import DockBooking from '../Pages/Dockbooking';
import Company from '../Pages/Company';
import TruckType from '../Pages/TruckType';
import Currency from '../Pages/Currency';
import Dock from '../Pages/Dock';
import Commodity from '../Pages/Commodity';
import Location from '../Pages/Location';
import Tenant from '../Pages/Tenant';
import Transporter from '../Pages/Transporter';
const Routers = () => {
  return (
    <Routes>
    <Route path='/' element = {<Navigate to='/home' />} />
    <Route path='/home' element={<Home />} />
    <Route path='/nav' element={<Nav />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/calendar' element={<Calendar />} />
    <Route path='/tracking' element={<Tracking />} />
    <Route path='/dockbooking' element={<DockBooking />} />
    <Route path='/settings/company' element={<Company />} />
    <Route path='/settings/trucktype' element={<TruckType />} />
    <Route path='/settings/currency' element={<Currency />} />
    <Route path='/settings/dock' element={<Dock />} />
    <Route path='/settings/commodity' element={<Commodity />} />
    <Route path='/settings/location' element={<Location />} />
    <Route path='/settings/tenant' element={<Tenant />} />
    <Route path='/settings/transporter' element={<Transporter />} />

    
    
   </Routes>
  )
 
    
  
}

export default Routers
