import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../components/Logout";
import { Button, Card } from "react-bootstrap";

axios.defaults.withCredentials = true;

function Login() {
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPassRegister] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const LoginUser = async () => {
    try {
      const url = "http://localhost:31/auth/login";
      const params = new URLSearchParams();
      params.append("email", emailRegister);
      params.append("password", passwordRegister);
      await axios.post(url, params).then((response) => {
        localStorage.setItem("token", response.data.acessToken);
        localStorage.setItem("userId", response.data.data.id);
        console.log(response.data.data.id);
      });
      setIsLoggedin(true);
      document.getElementById("response").innerHTML = "Logged In!";
    } catch (err) {
      if(err.response.status===401){alert(err.response.data)}
      console.log(err);
    }
  };

  const initializeAdmin= ()=>{
    const url = "http://localhost:31/auth/";
    axios.get(url)

  }
  useEffect(()=>{initializeAdmin();},[])
  const LogUserOutAndClear = () => {
    logout();
    setIsLoggedin(false);
    navigate("/");
  };


  return (
    <div style={{ color: "black" }}>
      <div id="response"></div>
      <Card.Title > <h5>Login</h5></Card.Title>
      <Link
        to={"/"}
        style={{
          fontSize: "30px",
          color: "black",
          textDecoration: "none",
          position: "absolute",
          top: "0",
          left: "0",
          paddingLeft: "5pc",
        }}
      >
        {" "}
        {"<"} Back to Home
      </Link>

      {!isLoggedin ? (
        <div className="loginBox">
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
          <Button
            color="primary"
            type="submit"
            className="btn-primary"
            onClick={LoginUser}
          >
            {" "}
            Submit
          </Button>
        </div>
      ) : (
        <div style={{ color: "black" }}>
          <Link
            to={"/"}
            style={{
              fontSize: "30px",
              color: "black",
              textDecoration: "none",
              position: "absolute",
              top: "0",
              left: "0",
              paddingLeft: "5pc",
            }}
          >
            {" "}
            {"<"} Back to Home
          </Link>

          <button onClick={LogUserOutAndClear}> LogOut</button>
          {/* <button onClick={userAuthenticated}> Check auth</button> */}
          {/* {(document.getElementsByClassName("loginBox").display = "none")} */}
        </div>
      )}
    </div>
  );
}

export default Login;
