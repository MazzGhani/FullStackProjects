import axios from 'axios'

export const deletePost= async(id)=>{
    const url= `http://localhost:31/posts/delete/${id}`
    await axios.delete(url).then((response)=>{window.location.reload();})
}

export const deleteComment= async(id)=>{
  const url= `http://localhost:31/comments/delete/${id}`
  await axios.delete(url).then((response)=>{window.location.reload();})
}


