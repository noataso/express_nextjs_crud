import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@/lib/db";

export async function fetchIDData(req:NextApiRequest,res:NextApiResponse,context:any){
    if(req.method=="PUT"){
        const {title,body,id}=req.body
        connection.query(`UPDATE users SET title=?,body=? WHERE id=?`,
        [title,body,id],
        (err)=>{
            if(err){
                console.log(err);
            }else{
                res.json({"success":"send"});
            }
        })
    }else{
        if(req.method=="DELETE"){
            const {id}=req.body
            connection.query(`DELETE FROM users WHERE id=?`,
            [id],
            (err)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json({"success":"send"});
                }
            }
            )
        }else{
            console.log("no method")
        }
    }
}
