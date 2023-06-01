import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { deletePost } from "../components/PostsComponents/DeletePosts";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ShowCommentByuserId from "../components/CommentsComponents/ShowCommentByuserId";

function Profile() {
  const [singlePost, setSinglePost] = useState([]);
  const [userInfo, setuserInfo] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const getPostbyId = () => {
      const url = `http://localhost:31/posts/usersPosts/${id}`;
      axios
        .get(url)
        .then((response) => {
          setSinglePost(response.data[1]);
        })
        .catch((err) => console.log(err));
    };
    const getUserInfo = () => {
      const url = `http://localhost:31/users/${id}`;
      axios
        .get(url)
        .then((response) => {
          setuserInfo(response.data[1]);
        })
        .catch((err) => console.log(err));
    };
    getPostbyId();
    getUserInfo();
  }, [id]);

  return (
    <div style={{ color: "black" }}>
      <h1>Your Posts:</h1>
      {singlePost.map((data) => (
        <div style={{ color: "black" }} key={data.id}>
          <Card>
            <Card.Header>Post {data.id}</Card.Header>
            <Card.Body>
              <Card.Title>Topic: {data.topic} </Card.Title>
              <Card.Text>
                Data: {data.data} Created At: {data.createdAt}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  deletePost(data.id);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
      {userInfo.map((data) => (
        <div style={{ color: "black" , width:"50%" }} className="mx-auto" key={data.id}>
          <Card >
            <Card.Body>
              <Card.Title>Current User</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Logged in as:
              </Card.Subtitle>
              <Card.Text>{data.username}</Card.Text>
              <Card.Text>{data.email}</Card.Text>
            </Card.Body>
          </Card>

          <ShowCommentByuserId userId={data.id}/>
        </div>
      ))}
    </div>
  );
}

export default Profile;
