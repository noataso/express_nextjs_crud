"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export interface postData{
  id:number,
  title:string,
  body:string,
  status:number,
  created_at:string,
  updated_at:string,
}

export default function Posts() {
  const router=useRouter();
  const {id}=router.query
  const API_URL="http://localhost:3000"
  const [post,setPost]=useState<postData>();
  const [title,setTitle]=useState(post?.title);
  const [body,setBody]=useState(post?.body);
  const [isEdit,setIsEdit]=useState(false);
  const getData=async(id:any)=>{
    const res=await fetch(`${API_URL}/api/posts`)
    const data=await res.json()
    // console.log(data)
    const getPost=data.find((data:postData)=>data.id===Number(id))
    // console.log(getPost)
    return setPost(getPost)
  }
  useEffect(()=>{
    getData(id)
  },[id])
  const idElement=<input type="hidden" value={post?.id} />
  const titleElement=<h2 onClick={()=>{setIsEdit(true),setTitle(post?.title),setBody(post?.body)}}>{post?.title}</h2>
  const bodyElement=<p onClick={()=>{setIsEdit(true),setTitle(post?.title),setBody(post?.body)}}>{post?.body}</p>
  const inputTitle=<input
  type="text"
  value={title}
  onChange={(e)=>setTitle(e.target.value)}
  className='form-control' />
  const inputBody=<textarea
  value={body}
  onChange={(e)=>setBody(e.target.value)}
  className='form-control'></textarea>
  async function handleUpdate(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    if(title==="" || body===""){
      return ;
    }else{
      const updatePost={id:Number(post?.id),title:title,body:body}
      return fetch(`${API_URL}/api/posts`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(
          updatePost
        )
      }).then((res)=>res.json())
      .then(()=>getData(id))
      .then(()=>setIsEdit(false))
      .then(()=>setTitle(post?.title))
      .then(()=>setBody(post?.body))
    }
  }
  async function handleDelete(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    return fetch(`${API_URL}/api/posts`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        id:post?.id
      }
      )
    }).then((res)=>res.json())
  }
  return (
    <main className="flex flex-col items-center justify-between">
      {post?.status===1?
      <form className='form-group'>
        {idElement}
        {isEdit? inputTitle:titleElement}
        {isEdit? inputBody:bodyElement}
        {isEdit? <button className='btn btn-success'
        onClick={(e)=>handleUpdate(e)}
        >Update</button>:""}
        {isEdit? <button className='btn btn-warning'
        onClick={()=>{setIsEdit(false),setTitle(post?.title),setBody(post?.body)}}>No Update</button>:""}
        {isEdit? "":<button className="btn btn-danger"
        onClick={(e)=>handleDelete(e)}>
          <Link href={`/`} style={{"textDecoration":"none","color":"black"}}>
            DELETE
          </Link>
        </button>}
      </form>
      :""}
    </main>
  )
}
