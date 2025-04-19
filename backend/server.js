const express=require("express")
const {connectDB}=require("./config/connect_to_database")
const user_routes=require("./routes/user")
const todo_routes=require("./routes/todo")
require("dotenv").config()
const app=express()
app.use(express.json())

connectDB()
app.use("/user",user_routes)
app.use("/todo",todo_routes)
app.listen(process.env.PORT,()=>{
    console.log("Server has started")
})
