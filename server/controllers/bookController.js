const { Book } = require('../models/userModel');
const uploadOnCloudinary = require('../utils/cloudinary.js');

const AddBooks = async (req, res) => {
  //desearlizing the req.body
  const { bookName, author, genre, bookQuantity, bookPrice, bookDescription, isbn } = req.body;

  //uploading the file to cloud
  const response = await uploadOnCloudinary(req.file.path);

  //setting the image src as cloud url
  const bookImage = response.url;
  try {
    const newBook = new Book({
      bookName,
      author,
      genre,
      bookPrice,
      bookQuantity,
      isbn,
      bookImage,
      bookDescription,
    });

    // Save the new book to the database
    await newBook.save();
    console.log("Book inserted successfully");
  }
  catch (error) {
    console.error("Error inserting book:", error);
  }
  res.send("Success");
}

const removeBook = async (req, res) => {
  //desearlizing the req.body
  // console.log(req.body);
  const { deleteBy, fieldValue } = req.body;
  const search = {};
  search[deleteBy] = fieldValue;
  // console.log(search);

  try {
    const book = await Book.findOneAndDelete(search);
    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { 
  AddBooks ,
  removeBook 
};