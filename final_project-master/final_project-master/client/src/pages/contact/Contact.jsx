import React from "react";
import "./contact.css";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

import PeopleIcon from "@mui/icons-material/People";
export default function Contact() {
  return (
    <div className="contact">
      <h1 className="contactTitle">Contact</h1>
      <div>
        <h1 className="contactBgTitle">
          Let Us Know Your Concerns | Qestions | Anything !
        </h1>
        <img
          className="contactImg"
          src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          alt=""
        />

        <div className="ContactUStext">
          <h1>CONTACT US</h1>
          <p>contactUs@email.com</p>
          <br />
          <br />
          <br />
          <br />
          <h1>BASED IN</h1>
          <p>Saskatoon, Sasktchewan CA</p>
        </div>

        <form className="formSize">
          <input
            type="text"
            placeholder="Full Name"
            className="contactInfoInput"
          />
          <input type="text" placeholder="Email" className="contactInfoInput" />
          <input
            type="text"
            placeholder="Message"
            className="contactInfoInput"
          />
        </form>
      </div>
      <br />
      <br />
      <div>
        <ul className="display">
          <li className="displayLi">
            <MessageIcon className="Icons" type="submit" />
          </li>
          <li className="displayLi">
            <PeopleIcon className="Icons" />
          </li>
          <li className="displayLi">
            <SupportAgentIcon className="Icons" />
          </li>
          <li className="displayLi">
            <PhoneIcon className="Icons" />
          </li>
          <li className="displayLi">
            <VolunteerActivismIcon className="Icons" />
          </li>
        </ul>
      </div>
    </div>
  );
}
