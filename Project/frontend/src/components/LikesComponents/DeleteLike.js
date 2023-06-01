import axios from 'axios'
import React from 'react'
import { BsFillHandThumbsDownFill } from "react-icons/bs";

export default function DeleteLike({postId}) {
    // const [addLike,setAddLike]= useState("")

    const deleteLikes= ()=>{
        const url=`http://localhost:31/likes?postId=${postId}`
        axios.delete(url)

    }

  return (
    <div>
          <div>
            <button onClick={deleteLikes}> <BsFillHandThumbsDownFill/></button>
        </div>
    </div>
  )
}