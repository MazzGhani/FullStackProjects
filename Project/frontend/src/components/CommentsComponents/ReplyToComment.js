import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ShowReply from "./ShowReply";

export default function ReplyToComment({ parentId }) {
  const [replyData, setReplyData] = useState([]);
  const { channelName } = useParams();
  const [reply, setReply] = useState("");

  const createReplyToComment = (parentId) => {
    const url = `http://localhost:31/comments/${channelName}/reply`;
    const params = new URLSearchParams();
    params.append("reply", reply);
    params.append("userId", localStorage.getItem("userId"));
    params.append("channelName", channelName);
    params.append("parentId", parentId);
    axios
      .post(url, params)
      .then((response) => {
        getReplies(parentId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReplies = (id) => {
    try {
      axios
        .get(`http://localhost:31/comments/reply?parentId=${id}`)
        .then((response) => {
          console.log(response);

          setReplyData(response.data[1]);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReplies(parentId);
  }, [parentId]);
  return (
    <div>
      <div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>More</Accordion.Header>
            <Accordion.Body>
              <InputGroup className="mb-1 mx-auto" style={{ width: "50%" }}>
                <InputGroup.Text id="basic-addon1">
                  Reply to Comment
                </InputGroup.Text>
                <Form.Control
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="..."
                  aria-label="..."
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button
                onClick={() => {
                  createReplyToComment(parentId);
                }}
                variant="primary"
                color="primary"
              >
                Create Reply
              </Button>{" "}
              <ShowReply data={replyData} mainParent={parentId} />
              {/* {replyData.map((answer, idx) => (
                <div style={{ marginLeft: "5pc" }} key={idx}>
                  Username: {answer.username} {answer.commentData}
                </div>
              ))} */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
