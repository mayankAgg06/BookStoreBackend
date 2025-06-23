import mongoose from 'mongoose';
import Books from '../models/bookModel.js';

const allBooks = async(req,res)=>{
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
}

export default allBooks;