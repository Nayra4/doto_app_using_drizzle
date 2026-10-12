import express from "express"
import {todoRoute} from "./Routes/todo.route.js"
import {userRoute} from "./Routes/user.route.js"
const app=express()
app.use(express.json())
app.use("/todo",todoRoute)
app.use("/user",userRoute)

app.use((err, req, res, next) => {
    console.log("err", err);
    res.status(500).json({ error: "something went wrong" });
});
app.listen(3000, () => {
    console.log("listening on port 3000");
})