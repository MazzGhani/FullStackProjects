import React, {  useState } from "react";
import axios from "axios";
import {  Card } from "react-bootstrap";


function Register() {
  const [usernameRegister, setUserRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPassRegister] = useState("");



  const RegisterUser = async () => {
    const url = "http://localhost:31/auth/register";
    const params=  new URLSearchParams();
    params.append("username",usernameRegister)
    params.append("email",emailRegister)
    params.append("password",passwordRegister)

    if(usernameRegister.length<2){
      alert("Username must be atleast 3 characters!")
    }
    if(passwordRegister.length<2){
      alert("Username must be atleast 3 characters!")
    }
  

    try {
      await axios.post(url, params).then( alert("Registered!")
        // document.getElementById("response").innerHTML= "Registerd !"
      );
      
      
    } catch (err) {
      if(err.response.status===422){alert(err.response.data)}
      console.log(err);
      
    }

  };

 

  return (
    <div className="registerBox">
      <Card.Title style={{color:"black"}}> <h5>Register</h5></Card.Title>
      <div id="response"></div>
      <input
        className="inputBox"
        type="text" 
        placeholder="Username"
        value={usernameRegister}
        onChange={(e) => setUserRegister(e.target.value)}
      />
      <input
        className="inputBox"
        type="email"
        placeholder="Email"
        value={emailRegister}
        onChange={(e) => setEmailRegister(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Password"
        value={passwordRegister}
        onChange={(e) => setPassRegister(e.target.value)}
      />
      <button className="registerButton" onClick={RegisterUser}> Submit</button>
    </div>
  );
}

export default Register;
