import React, { Component } from 'react'
// import * as React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ResponsiveAppBar from './components/Navbar'
import SignInUser from './SignIn_user'
import SignUpUser from './Signup_user'
import BasicMenu from './components/Menu'
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


import {
  BrowserRouter,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import SignUpVendor from './Signup_vendor'
import SignInVendor from './SignIn_vendor'
import UserDashboard from './User';

const Layout = () => {
  return (
    <div>

      <div>
        {/* <ResponsiveAppBar /> */}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div align="center">
        <BasicMenu />
      </div>

    </div>
  )
}

class App extends Component {

  render() {
    return (

      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Layout />} />
            <Route exact path="/signup_user" element={<SignUpUser />} />
            <Route exact path="/signup_vendor" element={<SignUpVendor />} />
            <Route exact path="/signin_user" element={<SignInUser />} />
            <Route exact path="/signin_vendor" element={<SignInVendor />} />
            <Route exact path="/user_dashboard" element={<UserDashboard />} />

          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
export default App