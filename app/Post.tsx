"use client";

import Link from "next/link";

export default function Post(props:any) {
  return (
    <>
      {props.post.status===1?
      <Link key={props.post.id} href={`/${props.post.id}`} style={{"textDecoration":"none","color":"black"}}>
        <h1 className='text-2xl font-bold mb-2'>{props.post.title}</h1>
        <p className="mb-4">{props.post.body}</p>
      </Link>
      :""}
    </>
  )
}