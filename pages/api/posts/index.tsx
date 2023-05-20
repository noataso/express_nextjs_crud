import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@/lib/db";
import { postData } from "@/app/Posts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req:NextApiRequest, res:NextApiResponse)=>{
    // await new Promise((resolve)=>setTimeout(resolve,4000))
    if(req.method==="GET"){
        connection.query(`SELECT * FROM users`,
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
            connection.query(`INSERT INTO users (title,body) VALUES (?,?)`,
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
            const {title,body,id}=req.body
            if(req.method==="PUT"){
                if(req.body.title && req.body.body){
                    connection.query(`UPDATE users SET title=?,body=? WHERE id=?`,
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
                    connection.query("UPDATE users SET status=2 WHERE id=?",
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