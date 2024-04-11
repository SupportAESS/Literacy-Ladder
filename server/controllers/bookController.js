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
  const { criteria, value } = req.body;

  try {
    const product = await Book.findOneAndDelete({ critera: value });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { 
  AddBooks ,
  removeBook 
};