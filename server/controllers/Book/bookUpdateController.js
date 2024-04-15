const { Book } = require('../../models/userModel.js');
const uploadOnCloudinary = require('../../utils/cloudinary.js');

const UpdateBooks = async (req, res) => {
  try {
    // Parsing the input object received from the frontend form
    const { updateFields, bookId, bookName, author, genre, bookQuantity, bookPrice, bookISBN, bookDescription } = req.body;

    // Find the book by its ID
    const book = await Book.findById(bookId);
    console.log(book);
    if (!book) {
      return res.status(400).send("Book not found");
    }

    // Update the book fields based on the provided input
    if (updateFields === "AllFields" || updateFields === "BookName") {
      book.bookName = bookName;
    }
    if (updateFields === "AllFields" || updateFields === "Author") {
      book.author = author;
    }
    if (updateFields === "AllFields" || updateFields === "Genre") {
      book.genre = genre;
    }
    if (updateFields === "AllFields" || updateFields === "BookQuantity") {
      book.bookQuantity = bookQuantity;
    }
    if (updateFields === "AllFields" || updateFields === "BookPrice") {
      book.bookPrice = bookPrice;
    }
    if (updateFields === "AllFields" || updateFields === "BookISBN") {
      book.isbn = bookISBN;
    }
    if (updateFields === "AllFields" || updateFields === "BookDescription") {
      book.bookDescription = bookDescription;
    }

    // Upload the file to cloudinary and update the book image if necessary
    if (updateFields === "AllFields" || updateFields === "BookImage") {
      const response = await uploadOnCloudinary(req.file.path);
      book.bookImage = response.url;
    }

    // Save the updated book to the database
    await book.save();
    console.log("Book updated successfully");

    res.send("Success");
  }
  catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { UpdateBooks };
