import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Channels from "../pages/Channels";
import Home from "../pages/Home";
import Post from "../pages/Post";
import User from "../pages/User";
import Channel from "../pages/Channel";
import Admin from "../pages/Admin";

export const NavBar = () => {
  const isLogged = localStorage.getItem("userId");

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user" element={<User />} />
        {isLogged === "1" ? <Route path="/admin" element={<Admin />} /> : <></>}
        {isLogged!=null ?
        (        
        <>
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="/channels/:channelName" element={<Channel />} />
        </>
)
      :(<></>)
      }

      </Routes>
    </BrowserRouter>
  );
};
