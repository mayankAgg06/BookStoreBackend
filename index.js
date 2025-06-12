import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Book from "./models/bookModel.js";
import dotenv from 'dotenv';
dotenv.config();

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.get('/',(req,res)=>{
    res.send("This is my First Backend Page");
})
app.post('/addbook',async (req,res)=>{
    const {title,author,genre,publishedDate} = req.body;

    const newBook = new Book({title,author,genre,publishedDate});

    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
        res.status(400).json({message: "Book Couldnot be added",error: error.message});
    }
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

