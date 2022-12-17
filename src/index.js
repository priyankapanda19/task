const express=require("express");
const mongoose=require("mongoose");
const route=require("./Route/router");
const app=express();

app.use(express.json())

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Priyanka19:G8reXRlHUbBX65ev@plutonium01.9fxu8wj.mongodb.net/KnovatorDB",{
    useNewUrlParser:true
})
.then(()=>console.log("mongoDB connected Successfully"))
.catch((err)=>console.log(err.message))

app.use("/",route)

app.listen(3000,()=>{
    console.log("Express is Running on port 3000")
})