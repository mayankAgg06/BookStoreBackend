import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            maxlength: [25,'Cannot be longer than 25 Characters'],
            minlength: [3,'Cannot be Shorted than 3 characters']
        },
        author:{
            type: String,
            required: true,
            maxlength: [25,'Cannot be longer than 25 Characters'],
            minlength: [3,'Cannot be Shorted than 3 characters']
        },
        genre:{
            type: String,
            required: true,
        },
        publishedDate:{
            type: Number, 
            required: true,
            min: [1800, 'Published year cannot be before 1800'],
            max: [new Date().getFullYear(), 'Published year cannot be later than the current year']
        }
    }
)

const Book = mongoose.model('Book',bookSchema);

export default Book;