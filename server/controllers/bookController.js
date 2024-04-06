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

const AddBooks = (req, res) => {
  const { bookName, author, productPrice, productQuantity, productType, genre, productDescription } = req.body;
  
  // Here you can process the received data as needed
  // For this example, I'm just logging it to the console
  console.log('Received data:', {
    bookName,
    author,
    productPrice,
    productQuantity,
    productType,
    genre,
    productDescription
  });

  // Respond with a success message
  insertBookData(bookName, author, genre, productPrice, productQuantity, productType, productDescription);

  res.send('Data received successfully!');
}

module.exports = { AddBooks };
