import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function AddPost() {
  const [topic, setTopic] = useState("");
  const [inputtedData, setInputtedData] = useState("");
  const { channelName } = useParams();

  const createPost = () => {
    const url = `http://localhost:31/posts/${channelName}`;
    const params = new URLSearchParams();
    params.append("topic", topic);
    params.append("data", inputtedData);
    params.append("userId", localStorage.getItem("userId"));
    params.append("channelName", channelName);

    axios
      .post(url, params)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ width: "50%" }} className="mx-auto">
        <h1 style={{ color: "black" }}>Create a New Post</h1>
        <InputGroup className="mb-1">
          <InputGroup.Text id="basic-addon1">Topic</InputGroup.Text>
          <Form.Control
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="..."
            aria-label="..."
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text id="basic-addon1">Data</InputGroup.Text>
          <Form.Control
            value={inputtedData}
            onChange={(e) => setInputtedData(e.target.value)}
            placeholder="..."
            aria-label="..."
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button onClick={createPost} variant="primary" color="primary">
          Create Post
        </Button>{" "}
      </div>
    </div>
  );
}

export default AddPost;
