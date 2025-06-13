import express from "express";
import mongoose, { SchemaTypeOptions } from "mongoose";
import cors from "cors";
import Book from "./models/bookModel.js";
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
dotenv.config();

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use('/book',bookRoutes);
app.get('/',(req,res)=>{
    res.send("This is my First Backend Page");
})


// DB Connection and Server Startup
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,(err)=>{
        if(err) console.log("Server couldnot run");
        console.log("My server is running fine");
    })
})
.catch((err)=>{
    console.log("Db couldnotbe connected",err);
})

