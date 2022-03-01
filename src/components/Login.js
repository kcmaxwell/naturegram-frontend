import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Login() {
  const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

  const login = () => {
    Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: process.env.REACT_APP_LOCAL_SERVER + '/api/auth/login',
    }).then((res) => console.log(res));
  };

  return (
    <div className="Login">
      <div>
        <h1>Login</h1>
        <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </div>
    </div>
  );
}

export default Login;