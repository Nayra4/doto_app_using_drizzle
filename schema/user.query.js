import {db} from "../db/db.js"
import { users } from "../db/schema.js"
import { eq } from "drizzle-orm";
async function getalluser() {
    const result=await db.select().from(users)
    return result
}
async function getserbyid(id) {
    const result=await db.select().from(users).where(eq(users.id,id))
    return result.rows[0]
}

async function createuser(name,email) {
    const result= await db.insert(users).values({
        name,
        email
    }).returning();

    return result;
}
async function deleteuser(id) {
    const result = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();

    return result[0];
}
async function updateuser(id,name,email){
    const result=await db
        .update(users)
        .set({
            name,
            email
        })
        .where(eq(users.id, id))
        .returning();

    return result[0];
}


export {
    getalluser,
    getserbyid,
    createuser,
    deleteuser,
    updateuser
};