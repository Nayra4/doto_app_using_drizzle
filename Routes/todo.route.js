import { Router } from "express"
import {getall,getbyid,create_todo,delete_todo,update} from "../schema/todo.query.js"
import { todoInsertSchema } from "../db/validation_schemas.js"
export const todoRoute =Router()

todoRoute.get("/",async (req,res)=>{
    const data=await getall()
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })
    }
    res.status(200).json({
        "data":data
    })
})
todoRoute.get("/toggle/:id",async(req,res)=>{
    const data = await  getbyid(req.params.id)
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })
    }
    if(data.is_done){
        await update(data.id, data.title, data.description, data.due_date, false)
        return res.status(200).json({
            "data":data
        })
    }
    else{
        await update(data.id, data.title, data.description, data.due_date, true )
        return res.status(200).json({
            "data":data
        })
    }
})
todoRoute.get("/:id",async (req,res)=>{
    const data=await getbyid(req.params.id)
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })
    }
    res.status(200).json({
        "data":data
    })
})
todoRoute.post("/", async (req, res) => {
    const body = todoInsertSchema.parse(req.body);

    const data = await create_todo(
        body.userId,
        body.title,
        body.description,
        body.dueDate
    );

    if (!data) {
        return res.status(404).json({
            error: "something went wrong"
        });
    }

    return res.status(201).json({
        message: "data created successfuly",
        data
    });
})
todoRoute.delete("/:id",async(req,res)=>{
    const data=await delete_todo(req.params.id);
    if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })}
    return res.status(204).json({
        "massage":"deleted successfuly"
    })
})
todoRoute.put("/:id",async(req,res)=>{
    const data=await update(req.params.id, req.body.title,  req.body.description,  req.body.due_date,  req.body.completed)
        if(!data){
        return res.status(404).json({
            error:"something went wrong"
        })}
        return res.status(200).json({
        "massage":"updated successfuly"
    })

})