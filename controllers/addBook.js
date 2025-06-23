import mongoose from 'mongoose';
import Books from '../models/bookModel.js';

const addBook = async (req,res)=>{
    const {title,author,genre,publishedDate} = req.body;

    const newBook = new Books({title,author,genre,publishedDate});

    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
        res.status(400).json({message: "Book Couldnot be added",error: error.message});
    }
}

export default addBook;