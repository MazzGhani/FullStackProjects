import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import {deleteComment} from "../PostsComponents/DeletePosts"
export default function ShowCommentByuserId({ userId }) {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const getUserComment = () => {
      try {
        axios
          .get(`http://localhost:31/comments/comment/user/userId?userId=1`)
          .then((response) => {
            setCommentData(response.data[1]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getUserComment();
  }, [userId]);

  return (
    <div>
      {commentData.map((data) => (
        <div
          style={{ color: "black", width: "50%" }}
          className="mx-auto"
          key={data.id}
        >
          <Card>
            <Card.Body>
              <Card.Text>Comment: {data.commentData}</Card.Text>
              <Card.Text>Channel Name:{data.channelName}</Card.Text>
            </Card.Body>
            <Button style={{width:"50%"}} className="mx-auto" onClick={()=>{deleteComment(data.id)}}> Delete</Button>
          </Card>
        </div>
      ))}
    </div>
  );
}
