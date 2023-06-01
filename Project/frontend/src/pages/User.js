import React from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { logout } from "../components/Logout";
import { Button, Tabs, Tab } from "react-bootstrap";
import Profile from "../pages/Profile"

function User() {
  const isLogged = localStorage.getItem("userId");

  return (
    <div>
      <div>
        {isLogged == null ? (
          <>
            <br />
            <br />
            <br />
            <Tabs
              defaultActiveKey="login"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="login" title="Login">
                <Login />
              </Tab>
              <Tab eventKey="register" title="Register">
                <Register />
              </Tab>
            </Tabs>
          </>
        ) : (
          <div>

            <Profile />
            <Button variant="primary" color="primary" onClick={logout}>
              {" "}
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
