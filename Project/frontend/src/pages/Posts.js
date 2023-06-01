import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import ShowComments from "../components/CommentsComponents/ShowComments";
import { Link } from "react-router-dom";
import ShowLikes from "../components/LikesComponents/ShowLikes";
import { deletePost } from "../components/PostsComponents/DeletePosts";
import Table from "react-bootstrap/Table";

// This component shows all the post on the POST page
// it lists all the post made by all users
function AllPostShown() {
  const isLogged = localStorage.getItem("userId");
  const [allPostData, setAllPostData] = useState([]);

  const getPosts = () => {
    try {
      axios.get(`http://localhost:31/posts/`).then((response) => {
        setAllPostData(response.data[1]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {isLogged === "1" ? (
        <>
          {allPostData.map((data) => (
            <div key={data.id} style={{ color: "black" }}>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Topic</th>
                    <th>Data</th>
                    {/* <th>Comments</th> */}
                    <th>Likes</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>
                      {" "}
                      <Link to={`/posts/${data.id}`}> {data.id} </Link>
                    </th>
                    <th>{data.topic}</th>
                    <th>{data.data}</th>
                    {/* <th>
                      <ShowComments postId={data.id} />
                    </th> */}
                    <th>
                      <ShowLikes postId={data.id} />
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          deletePost(data.id);
                        }}
                      >
                        {" "}
                        Delete
                      </button>
                    </th>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AllPostShown;
