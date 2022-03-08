import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Axios from 'axios';
import './App.css';

import { 
  Home,
  Login,
  Register,
  Upload,
} from './components';

function RequireAuth({ children }) {
  // use Axios to get the login status from the server
  Axios({
    method: 'GET',
    withCredentials: true,
    url: process.env.REACT_APP_LOCAL_SERVER + '/api/auth/check-logged-in'
  }).then(res => {
    if (res.data === true) {
      return children;
    } else {
      return <Navigate to='/login' replace />;
    }
  });
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  /*useEffect(() => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: process.env.REACT_APP_LOCAL_SERVER + '/api/auth/check-logged-in'
    }).then(res => {
      setLoggedIn(res.data);
    });
}, []);*/

  const checkLoggedIn = () => {
    console.log(loggedIn);
    return loggedIn;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
