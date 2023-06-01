import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ShowPosts from "../components/PostsComponents/ShowPosts";
import ShowComments from "../components/CommentsComponents/ShowComments";
import AddPost from "../components/PostsComponents/AddPost";
import Card from "react-bootstrap/Card";
import ShowLikes from "../components/LikesComponents/ShowLikes";
import TopBar from "../components/TopBar";

export default function ShowChannels() {
  const { channelName } = useParams();
  const [singleChannel, setSingleChannel] = useState([]);
  const [postinChannel, setPostinChannel] = useState([]);
  const [createedBy, setCreatedBy]= useState("")


  const currentUser = localStorage.getItem("userId");

  const postUsername= (id)=>{
    const params= new URLSearchParams();
    params.append("id",currentUser)
    axios.get(`http://localhost:31/users/${id}`).then((response)=>{
      alert("Post created By: "+ response.data[1][0].username);
    
    })
  }


  useEffect(() => {

    const getUserByid= (id)=>{
      const params= new URLSearchParams();
      params.append("id",currentUser)
      axios.get(`http://localhost:31/users/${id}`).then((response)=>{
        setCreatedBy(response.data[1][0].username);
      
      })
    }

  
    const getChannelbyName = () => {
      const url = `http://localhost:31/channels/${channelName}`;

      axios
        .get(url)
        .then((response) => {
          const userIdName= response.data[1][0].userId
          getUserByid(userIdName)
          setSingleChannel(response.data[1]);
        })
        .catch((err) => console.log(err));
    };
    const getPostbyChannelName = () => {
      const url = `http://localhost:31/posts/ch/${channelName}`;
      axios
        .get(url)
        .then((response) => {
          setPostinChannel(response.data[1]);
        })
        .catch((err) => console.log(err));
    };
    getChannelbyName();
    getPostbyChannelName();

  }, [channelName,currentUser]);

  return (
    <div>
      <TopBar />

      {singleChannel.map((data) => (
        <div style={{ color: "black" }} key={data.id}>
          <h1 className="">
            Channel: {data.channelName} Created By:
            {createedBy}
            <ShowPosts />
          </h1>
        </div>
      ))}
      {postinChannel.map((datas) => (
        <div style={{ color: "black" }} key={datas.id}>
          <Card style={{ width: "50%" }} className="mx-auto">
            <Card.Body> Topic: {datas.topic} </Card.Body>
            <Card.Body>
              Data: {datas.data} 
              {currentUser === JSON.stringify(datas.userId) ? (
                <>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/posts/${datas.id}`}
                  >
                    {" >"}Edit Post
                  </Link>
                  <ShowLikes postId={datas.id} />
                </>
              ) : (
                <>
                  <ShowLikes postId={datas.id} />
                </>
              )}
            </Card.Body>
            <Card.Body>
              <ShowComments postId={datas.id} />
            </Card.Body>
            <div> <button onClick={()=>{postUsername(datas.userId)}}>Who posted this?</button></div>
                
          </Card>
        </div>
      ))}
      <AddPost />
    </div>
  );
}
