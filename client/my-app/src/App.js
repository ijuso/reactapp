import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css"

function App() {

  
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

//luodaan lista fiunction
  const addList = () => {
    Axios.post('http://localhost:5000/api/add', {username: username, password: password})
    //console.log(username)
    //lataa sivun uudelleen lisäyksen jälkeen
    window.location.reload(false);
  };

  const deleteUser = (id) => {
    Axios.delete('http://localhost:5000/api/delete/'+id);
    window.location.reload(false);
  };
  const [userList, setUserList] = useState([])

  //haetaan omasta apista data
  useEffect(()=> {
    Axios.get('http://localhost:5000/api/getall').then((response) => {
      setUserList(response.data);

      
    })

  }, [])


  
/*luodaan sivustolle input fprm 
ja userlista alle */
  return <div className="App">
    <h1>React appi wups</h1>


    <label>Username:</label>
    <input type="text" onChange={(event) => {
      setUser(event.target.value);
      }} placeholder="username"></input>
    <label>Password:</label>
    <input type="text" onChange={(event) => {
      setPass(event.target.value);
      }} placeholder="password"></input>
    <button onClick={addList}>Lisää listalle</button>

    <h1>User list</h1>
    {userList.map((val, key) => {
      return <div key={key}> <h2> Username: {val.username}</h2> <h4> Password: {val.password} </h4>
      <button onClick={() => deleteUser(val._id)} >Delete</button> </div>
      
    })}



  </div>;
}

export default App;