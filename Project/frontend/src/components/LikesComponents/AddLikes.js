import axios from 'axios'
import React from 'react'

import { BsFillHandThumbsUpFill } from "react-icons/bs";


export default function AddLikes({postId}) {
    // const [addLike,setAddLike]= useState("")

    const upvoteMessage= ()=>{
        const url=`http://localhost:31/likes`
        const params=new URLSearchParams();
        params.append("postId",postId)
        axios.post(url,params)

    }

  return (
    <div>
          <div>
            
           
            <button onClick={upvoteMessage}>  <BsFillHandThumbsUpFill/></button>
        </div>
    </div>
  )
}
