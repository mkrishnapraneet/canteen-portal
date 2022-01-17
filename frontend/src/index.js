import React from 'react';
import ReactDOM from 'react-dom';
import User from './User';
import reportWebVitals from './reportWebVitals';
import SignUp from './Signup';
import SignIn from './SignIn';

ReactDOM.render(
  <React.StrictMode>
    <User />
    <SignUp />
    <SignIn />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
