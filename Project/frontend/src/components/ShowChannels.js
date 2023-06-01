import React from "react";
import { Link } from "react-router-dom";

function ShowChannels({ data }) {
  const isLoggedIn = localStorage.getItem("userId");

  return (
    <div className="card" style={{ color: "black", marginTop: "2pc" }}>
      <div className="card-body">
        <h5 className="display-4">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/channels/${data.channelName}`}
          >
            {" "}
            {data.channelName}
            {isLoggedIn === "1" ? <>ID:{data.id}</> : <></>}
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default ShowChannels;
