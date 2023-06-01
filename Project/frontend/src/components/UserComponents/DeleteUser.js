import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function DeleteUser() {
  const [id, setuserId] = useState("");
  const [listUsers, setListUsers] = useState([]);

  const deleteUser = () => {
    const url = `http://localhost:31/auth?id=${id}`;
    axios.delete(url).then((response) => {
      getListOfUsers();
    });
  };
  const getListOfUsers = () => {
    const url = `http://localhost:31/auth/allusers`;
    axios.get(url).then((response) => {
      setListUsers(response.data[1]);
    });
  };
  useEffect(() => {
    getListOfUsers();
  }, []);

  return (
    <div style={{ color: "black" }}>
      <div>Enter ID to delete user</div>

      <input
        type="text"
        value={id}
        onChange={(e) => setuserId(e.target.value)}
      />
      <button onClick={deleteUser}> Delete User</button>

      {listUsers.map((datas) => (
        <div key={datas.id}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>UserName</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{datas.id}</td>
                <td>{datas.username} </td>
                <td>{datas.email}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}

export default DeleteUser;
