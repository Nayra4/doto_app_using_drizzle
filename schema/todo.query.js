import {pool} from "../db.js"

async function getall(){

    const result=await pool.query("select * from todos")
    return result.rows
}
async function getbyid(id){

    const result=await pool.query("select * from todos where id =$1 ",[id])
    return result.rows[0]
}
async function create_todo(user_id, title, description, due_date) {
    const result=await pool.query("INSERT INTO todos(user_id, title, description, due_date)  VALUES ($1, $2, $3, $4) RETURNING * ",[user_id, title, description ?? null, due_date ?? null])
    return result.rows[0]
}
async function update(id, title, description, due_date, is_done) {
    const result = await pool.query(
        "UPDATE todos SET title = $1, description = $2, due_date = $3, is_done = $4 WHERE id = $5 RETURNING *",
        [title, description , due_date , is_done, id]
    )
    return result.rows[0]
    
}
async function delete_todo(id) {
    const result = await pool.query(
        "DELETE FROM todos WHERE id = $1 RETURNING *",
        [id]
    )
    return result.rows[0]
} 

export {
    getall,
    getbyid,
    create_todo,
    delete_todo,
    update
};