import React from "react";

function ShowReply({ data }) {

  return (
    <div style={{ color: "black"}}>
        {data.map((answer,idx)=>(
               <div style={{ marginLeft: "5pc" }} key={idx}>
               Username: {answer.username} Comment: {answer.commentData} 
             </div>
        ))}

    </div>
  );
}

export default ShowReply;
