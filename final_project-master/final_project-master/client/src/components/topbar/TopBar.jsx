import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="top_left">
        <a
          className="headerIcon"
          href="https://github.com/jgx1204"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="JImg"
            src="https://media.discordapp.net/attachments/362734976569049090/912219808391639080/Screenshot_20200725-221024_Instagram.jpg"
            alt=""
          />
        </a>

        <a
          className="headerIcon"
          href="https://github.com/MazzGhani"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="MImg"
            src="https://media.discordapp.net/attachments/362734976569049090/912219807854780437/Snapchat-320657875.jpg?width=244&height=473"
            alt=""
          />
        </a>
      </div>
      <div className="top_center">
        <ul className="top_list">
          <li className="top_item">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="top_item">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="top_item">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="top_item">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li className="top_item" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          )}
        </ul>
      </div>
      <div className="top_right">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImageSettings"
              src="https://pbs.twimg.com/profile_images/378800000511535745/ce396db06a7f5c7ff03fb49aa1e42705_400x400.png"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="top_item">
              <Link className="link" to="/login">
                LOG IN
              </Link>
            </li>

            <li className="top_item">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
