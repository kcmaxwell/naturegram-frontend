import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

    const register = () => {
        Axios({
          method: 'POST',
          data: {
            username: registerUsername,
            password: registerPassword,
            first_name: 'Test',
            last_name: 'User'
          },
          withCredentials: true,
          url: process.env.REACT_APP_LOCAL_SERVER + '/api/auth/register',
        }).then((res) => console.log(res));
      };

    return (
      <div className="App">
          <div>
          <h1>Register</h1>
          <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
          <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
          <button onClick={register}>Submit</button>
          </div>
      </div>
    );
}

export default Register;