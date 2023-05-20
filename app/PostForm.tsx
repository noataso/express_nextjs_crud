"use client";

import { useState } from "react";

export default function PostForm(props:any) {
    const API_URL="http://localhost:3000"
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    async function submitHandler(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if(title==="" || body===""){
            return ;
        }else{
            const post={title:title,body:body}
            return fetch(`${API_URL}/api/posts`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(
                    post
                )
            }).then((res)=>res.json())
            .then(props.getData)
            .then(()=>setTitle(""))
            .then(()=>setBody(""))
            .catch((error)=>console.log(error))
        }
    }
  return (
    <form className="form-group">
        <input
            type="text"
            className="form-control text-start mb-4"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />
        <textarea
            className="form-control text-start mb-4"
            name="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}></textarea>
        <button
            type="submit"
            className="btn btn-primary mb-4"
            onClick={(e)=>submitHandler(e)}>Submit</button>
    </form>
  )
}