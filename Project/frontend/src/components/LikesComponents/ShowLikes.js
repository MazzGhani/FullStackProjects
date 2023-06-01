import axios from "axios";
import React, { useEffect, useState } from "react";
import AddLikes from "./AddLikes";
import DeleteLike from "./DeleteLike";
import Stack from "react-bootstrap/Stack";

export default function ShowLikes({ postId }) {
  // const [addLike,setAddLike]= useState("")
  const [likeCount, setlikeCOunt] = useState([]);

  useEffect(() => {
    const gettingLikes = () => {
      const url = `http://localhost:31/likes?postId=${postId}`;
      axios.get(url).then((response) => {
        setlikeCOunt(response.data[1]);
      });
    };

    gettingLikes();
  }, [postId]);

  return (
    <div className="mx-auto" style={{width:"10%"}}>
      <Stack direction="horizontal" gap={3} >
        <div >
          {" "}
          {likeCount.map((datas, index) => (
            <div key={index}>
              <p> Likes: {datas.number}</p>
            </div>
          ))}
        </div>
        <div className="bg-light border">
          {" "}
          <AddLikes postId={postId} />
        </div>
        <div className="bg-light border">
          {" "}
          <DeleteLike postId={postId} />
        </div>
      </Stack>

    </div>
  );
}
