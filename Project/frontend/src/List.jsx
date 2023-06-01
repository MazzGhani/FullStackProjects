import React, { useState } from "react";

function List({items}){
    const [name,setName]= useState("")

    const addItem= ()=>{
        items.push({"id":items.length+1,"name":name})

    }

    return(
        <div style={{color:"black"}}>
            {items.map((data)=>(
                <div key={data.id}>
                    {data.name}
                </div>
            ))}
        <input type="text"
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        <button onClick={()=>{addItem()}}> click me</button>

        </div>
    )
}

export default List;