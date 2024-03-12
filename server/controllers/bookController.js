const { Book } = require('../models/userModel');

async function insertBookData(bookName, author, genre, productPrice, productQuantity, productType, productDescription) {
  try {
    // Create a new document with the provided data
    const newBook = new Book({
      bookName,
      author,
      genre,
      productPrice,
      productQuantity,
      productType,
      productDescription
    });

    // Save the new document to the database
    await newBook.save();

    console.log("Book inserted successfully");
  } catch (error) {
    console.error("Error inserting book:", error);
  }
}

module.exports = { insertBookData };
