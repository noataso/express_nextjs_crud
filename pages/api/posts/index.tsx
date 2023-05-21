import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@/lib/db";
import { postData } from "@/app/Posts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req:NextApiRequest, res:NextApiResponse)=>{
    // await new Promise((resolve)=>setTimeout(resolve,4000))
    if(req.method==="GET"){
        connection.query(`SELECT * FROM posts`,
        (err,results:postData)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).json(results)
            }
        })
    }else{
        if(req.method==="POST"){
            const {title,body}=req.body
            connection.query(`INSERT INTO posts (title,body) VALUES (?,?)`,
            [title,body],
            (err)=>{
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json({"success":"send"})
                }
            }
            )
        }else{
            if(req.method==="PUT"){
                const {title,body,id}=req.body
                if(req.body.title && req.body.body){
                    connection.query(`UPDATE posts SET title=?,body=? WHERE id=?`,
                    [title,body,id],
                    (err)=>{
                        if(err){
                            console.log(err)
                        }else{
                            res.status(200).json({"success":"send"})
                        }
                    }
                    )
                }else{
                    connection.query("UPDATE posts SET status=2 WHERE id=?",
                    [id],
                    (err)=>{
                        if(err){
                            console.log(err)
                        }else{
                            res.status(200).json({"success":"send"})
                        }
                    }
                    )
                }
            }else{
                console.log("no method")
            }
        }
    }
}