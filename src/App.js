import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const register = () => {
    Axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: process.env.REACT_APP_LOCAL_SERVER + '/register',
    }).then((res) => console.log(res));
  };
  const login = () => {
    Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: process.env.REACT_APP_LOCAL_SERVER + '/login',
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: process.env.REACT_APP_LOCAL_SERVER + '/user',
    }).then((res) => {
      // only set data if it is non-null
      if (res.data)
        setData(res.data);
    });
  };
  const logout = () => {
    Axios({
      method: 'POST',
      withCredentials: true,
      url: process.env.REACT_APP_LOCAL_SERVER + '/logout',
    }).then((res) => console.log(res));
    setData(null);
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>

      <div>
        <h1>Log out</h1>
        <button onClick={logout}>Submit</button>
      </div>
    </div>
  );
}

export default App;
