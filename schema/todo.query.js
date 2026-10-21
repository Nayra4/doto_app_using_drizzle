import {db} from "../db/db.js"
import { todos } from "../db/schema.js"
import { eq } from "drizzle-orm";

async function getall(){

    const result=await db.select().from(todos)
    return result
}
async function getbyid(id){

    const result=await db.select().from(todos).where(eq(todos.id,id))
    return result
}
async function create_todo(user_id, title, description, due_date) {
    const result = await db.insert(todos).values({
        userId: user_id,
        title,
        description,
        dueDate: due_date ? new Date(due_date) : null,
    }).returning();

    return result[0];
}
// async function create_todo(user_id, title, description, due_date) {
//     const result=await db.insert(todos).values({
//     userId: user_id,
//     title: title,
//     description: description,
//     dueDate: due_date ? new Date(due_date) : null
// }).returning();
//     return result
// }

async function update(id, title, description, due_date, completed) {
    const result = await db
        .update(todos)
        .set({
            title,
            description,
            dueDate: due_date ? new Date(due_date) : null,
            completed
        })
        .where(eq(todos.id, id))
        .returning();

    return result[0];
    }

async function delete_todo(id) {
    const result = await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning();

    return result[0];
}

export {
    getall,
    getbyid,
    create_todo,
    delete_todo,
    update
};