import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReplyToComment from "./ReplyToComment";
import InputGroup from "react-bootstrap/InputGroup";
import { deleteComment } from "../PostsComponents/DeletePosts";

export default function ShowComments({ postId }) {
  const [desc, setDesc] = useState("");
  const [commentData, setCommentData] = useState([]);
  const { channelName } = useParams();

  const createComment = () => {
    const url = `http://localhost:31/comments/${channelName}`;
    const params = new URLSearchParams();
    params.append("data", desc);
    params.append("userId", localStorage.getItem("userId"));
    params.append("channelName", channelName);
    params.append("postId", postId);

    axios
      .post(url, params)
      .then((response) => {
        getComments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = () => {
    try {
      axios
        .get(`http://localhost:31/comments?postId=${postId}`)
        .then((response) => {
          setCommentData(response.data[1]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getCommentsOnce = () => {
      try {
        axios
          .get(`http://localhost:31/comments?postId=${postId}`)
          .then((response) => {
            setCommentData(response.data[1]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getCommentsOnce();
  }, [postId]);

  const currentUser = localStorage.getItem("userId");

  return (
    <div>
      <div>
        <Form onSubmit={createComment}>
          <Form.Group className="mb-3" controlId="formBasicComment">
            <Form.Label>Comment</Form.Label>
            <InputGroup className="mb-1 mx-auto" style={{ width: "50%" }}>
              <InputGroup.Text id="basic-addon1">Comment</InputGroup.Text>
              <Form.Control
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="..."
                aria-label="..."
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Button onClick={createComment} variant="primary" color="primary">
              Create Comment
            </Button>{" "}
          </Form.Group>
        </Form>
      </div>
      {commentData.map((data, idx) => (
        <div
          style={{
            border: "2px solid white",
            marginTop: "2pc",
            color: "black",
          }}
          key={idx}
        >
          <div>
            {" "}
            Username: {data.username} comment:{data.commentData}
            {currentUser === JSON.stringify(data.userId) ||
            currentUser === "1" ? (
              
              <>
              {" "}
                <Button
                  onClick={() => {
                    deleteComment(data.id);
                  }}
                  variant="primary"
                  color="primary"
                >
                  Delete
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <ReplyToComment parentId={data.id} />
        </div>
      ))}
    </div>
  );
}
