import { Router } from "express"
import  {getalluser,getserbyid,createuser,deleteuser,updateuser } from "../schema/user.query.js"
import bcrypt from "bcrypt"
export const userRoute =Router()

userRoute.get("/",async(req,res)=>{
    const data=await getalluser()
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })
    }
    res.status(200).json({
        "data":data
    })
})
userRoute.get("/:id",async(req,res)=>{
    const data=await getserbyid(req.params.id)
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })
    }
    res.status(200).json({
        "data":data
    })
})

userRoute.post("/",async(req,res)=>{
    const password =await bcrypt.hash(req.body.password_hash,12)
    const data =await createuser(req.body.name, req.body.email, password)
    console.log(data);
    
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })
    }
    return res.status(201).json({
        message:"data created successfuly ",
        data :data
    })
})
userRoute.delete("/:id",async(req,res)=>{
    const data=await deleteuser(req.params.id);
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })}
    return res.status(204).json({
        "massage":"deleted successfuly"
    })
})
userRoute.put("/:id",async(req,res)=>{
    const password =await bcrypt.hash(req.body.password_hash,12)
    const data=await updateuser(req.params.id,req.body.name, req.body.email, password)
        if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })}
        return res.status(200).json({
        "massage":"updated successfuly"
    })

})