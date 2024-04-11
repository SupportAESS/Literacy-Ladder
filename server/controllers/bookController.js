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
  const { genre, bookName } = req.body;

  const book = await Book.find({})

  //setting the image src as cloud url
  const bookImage = response.url;
  try {
    const newBook = new Book({
      bookName,
      author,
      genre,
      bookPrice,
      bookQuantity,
      bookImage,
      bookDescription
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

module.exports = { AddBooks };