import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

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

export default Home;