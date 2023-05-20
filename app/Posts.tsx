"use client";
import { useEffect, useState } from 'react';
import Post from './Post';
import PostForm from './PostForm';

export interface postData{
  id:number,
  title:string,
  body:string,
  status:number,
  created_at:string,
  updated_at:string,
}

export default function Posts() {
  const API_URL="http://localhost:3000"
  const [posts,setPosts]=useState([]);
  const getData=async()=>{
    const res=await fetch(`${API_URL}/api/posts`)
    const data=await res.json()
    setPosts(data)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <main className="flex flex-col items-center justify-between">
      {posts.map((post:postData)=>{
        return(
            <>
              <Post post={post} />
            </>
        )
      })}
      <PostForm setPosts={setPosts} getData={getData} />
    </main>
  )
}
