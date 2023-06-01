import React from "react";
import { useParams } from "react-router-dom";
import ShowPosts from "../components//PostsComponents/ShowPosts";

function Post() {
  const { id } = useParams();

  return (
    <div>


        <ShowPosts data={id} />


      
    </div>
  );
}

export default Post;
