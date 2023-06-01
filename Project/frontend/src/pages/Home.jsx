import React, { useEffect, useState } from "react";
// import SearchBar from "../components/SearchBar";
// import { logout } from "../components/Logout";
// import About from "./About";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import axios from "axios";
// import TopBar from "../components/TopBar";

export const reloadPage = () => {
  window.location.reload();
};

function Home() {

  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [data,setdata]=useState([])


  const sendData=()=>{
    const url="http://localhost:31/todo"
    fetch(url,
      {method:"POST",
       body: new URLSearchParams({
        title:title,
        description:description
       }),
       headers:{"Content-type": "application/x-www-form-urlencoded"}
    }
      
      ).then((response)=>{response.json()}).then((data)=>{console.log(data)})
    

  }

  const  getData= async()=>{
    try{
      const url="http://localhost:31/todo"
      const res = await fetch(url,{method:"GET"})
      const allData= await res.json()
      setdata(allData[1])
      console.log(allData[1])



    }catch(err){console.log(err)}

  }

  const deleting= (id) =>{
    console.log(id)

  }



  useEffect(() => {
    const init = () => {
      axios.get("http://localhost:31/init").catch((err)=>{
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
      });
    };
    init();
  }, []);
  // const isLogged = localStorage.getItem("userId");
  return (
    <>

    <div style={{color:"black"}}>
      <h1> Title</h1>
    <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
    <h1>Description</h1>
    <input type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
    <button onClick={()=>{sendData()}}> Enter</button>
    <button onClick={()=>{getData()}}> Get</button>
    {data.map((result,idx)=>(
      <div style={{color:"black"}} key={idx}>
        {result.title}  {result.description}
        <button onClick={()=>{deleting(result.id)}}> Delete</button>

      </div>
    ))}


    </div>
      {/* <TopBar />

      {isLogged == null ? (
        <Card.Title>
          <p className="text-primary">Please Login in to see data</p>
        </Card.Title>
      ) : (
        <div>
          <Button
            className="position-absolute top-0 end-0"
            onClick={() => {
              logout();
              reloadPage();
            }}
            variant="primary"
            color="primary"
          >
            Logout
          </Button>{" "}
          <SearchBar />
        </div>
      )}
      <About /> */}
    </>
  );
}

export default Home;
