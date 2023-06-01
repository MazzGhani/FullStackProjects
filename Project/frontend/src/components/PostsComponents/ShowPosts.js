import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowComments from "../CommentsComponents/ShowComments";
import {deletePost} from './DeletePosts';
import ShowLikes from "../LikesComponents/ShowLikes";


export default function ShowPosts() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState([]);

  useEffect(() => {
    const getPostbyId = () => {
      const url = `http://localhost:31/posts/${id}`;
      axios
        .get(url)
        .then((response) => {
          setSinglePost(response.data[1]);
        })
        .catch((err) => console.log(err));
    };
    getPostbyId();
  }, [id]);

  return (
    <div>
      {singlePost.map((data) => (
        <div style={{color:"black"}} key={data.id}>
          <h1>
             Topic: {data.topic} Data: {data.data} {data.createdAt}
             <button onClick={()=>{deletePost(data.id)}}> Delete</button>

          </h1>
          <ShowLikes postId={data.id}/>

          <ShowComments  postId={data.id}/>
        </div>
      ))}
    </div>
  );
}
