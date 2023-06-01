import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function TopBar() {
  const isLogged = localStorage.getItem("userId");
  return (
    <>
 <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CMPT353 Project</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link as={Link} to={"/user"}>
              Account
            </Nav.Link>
            {isLogged === "1" ? (
              <Nav.Link as={Link} to={"/admin"}>
                Admin
              </Nav.Link>
            ) : (
              <></>
            )}
            {isLogged === null ? (
              <></>
            ) : (
              <>
                <Nav.Link as={Link} to={"/channels"}>
                  Channels
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>


    </>
  )
}
