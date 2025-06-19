import express from 'express';
import mongoose from 'mongoose';
import Books from '../models/bookModel.js';

const router = express.Router();

router.get('/search/:id',async (req,res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
        {res.status(400).json({message: "Invalid Id, please check again"});}

        const currBook = await Books.findById(id);

        if(!currBook)
        {res.status(404).json({message:"Book not found"});}

        res.status(200).json({currBook});
    }
    catch(error){
        res.status(500).json({message: "Error fetching the book", error: error.message})
    }
});


router.get('/allbooks', async(req,res)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const skip = (page-1)*limit;

        const books = await Books.find().skip(skip).limit(limit);

        const totalBooks = await Books.countDocuments();

        const totalPages = Math.ceil(totalBooks/limit);

        res.status(200).json({books,pagination :{
                currentpage: page, totalPages, totalBooks
            }
        });
    }
    catch(error){
        res.status(500).json({message: "Error fetching the books", error: error.message})
    }
});

router.post('/addbook',async (req,res)=>{
    const {title,author,genre,publishedDate} = req.body;

    const newBook = new Books({title,author,genre,publishedDate});

    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
        res.status(400).json({message: "Book Couldnot be added",error: error.message});
    }
})

router.put('/search/:id', async (req,res)=>{
    try{
        const {id} = req.params;

        const updatedBookData = req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({message: 'Invalid Book ID'});
        }

        const updatedBook = await Books.findByIdAndUpdate(id, updatedBookData, {new:true});

        if(!updatedBook) res.status(404).json({message: 'Book Not found'});

        res.status(200).json(updatedBook,{message: "Book updated Successfully"});
    }
    catch(error){
        res.status(500).json({message: 'Error updating the book', error: error.message});
    }
});

router.delete('/search/:id',async (req,res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) 
        {
            res.status(400).json({message:"Invalid Book ID"});
        }

        const deletedBook = Books.findByIdAndDelete(id);

        if(!deletedBook)
        {res.status(404).json({message: 'Book Not Found'})};

        res.status(200).json({message:'Book Deleted Successfully'});
    }
    catch(error){
        res.status(500).json({message: "Error Deleting the Book", error: error.message});
    }
})

export default router;