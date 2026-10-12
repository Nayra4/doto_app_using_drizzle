import {pool} from "../db.js"

async function getalluser() {
    const result=await pool.query("select * from users ")
    return result.rows
}
async function getserbyid(id) {
    const result=await pool.query("select * from users where id=$1",[id])
    return result.rows[0]
}

async function createuser(name,email,password_hash) {
    const result=await pool.query("insert into users(name,email,password_hash)  VALUES ($1,$2,$3) RETURNING*",[name,email,password_hash])
    return  result.rows[0]
}
async function deleteuser(id) {
    const result=await pool.query("delete from users where id=$1 RETURNING*",[id])
    return  result.rows[0]
}
async function updateuser(id,name,email,password_hash){
    const result= await pool.query("UPDATE users SET name=$1 ,email=$2, password_hash=$3 where id =$4 RETURNING*",[name, email, password_hash, id])
    return  result.rows[0]
}


export {
    getalluser,
    getserbyid,
    createuser,
    deleteuser,
    updateuser
};