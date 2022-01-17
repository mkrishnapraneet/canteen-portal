import React, { Component } from 'react'
// import * as React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar'
import SignIn from './SignIn'
import SignUp from './Signup'
import BasicMenu from './components/Menu'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

class App extends Component {

  render() {
    return (

      <div>
        <div>
          <NavBar />
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div align="center">          
          <BasicMenu />
        </div>

        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />

          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
export default App