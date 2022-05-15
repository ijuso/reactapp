import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css"
import axios from "axios";

function App() {

  const [userList, setUserList] = useState([])

  useEffect(()=> {
    Axios.get('http://localhost:5000/api/getall').then((response) => {
      setUserList(response.data);
    })

  }, [])

  return <div className="App">
    <h1>React appi wups</h1>

    <label>Username:</label>
    <input type="text" placeholder="username"></input>
    <label>Password:</label>
    <input type="text" placeholder="password"></input>
    <button>Lisää listalle</button>

    <h1>User list</h1>

    {userList.map((val, key) => {
      return <div> <h1> {val.username}</h1> </div>
    })}

  </div>;
}

export default App;