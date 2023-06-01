import React from "react";
import Posts from "./Posts";
import Channels from "./Channels";
import DeleteUser from "../components/UserComponents/DeleteUser";

function Admin() {
  return (
    <div>
      <div>
        <Channels />
        <Posts />
        <DeleteUser />
      </div>
    </div>
  );
}

export default Admin;
