const { Book } = require('../models/userModel');

const ViewBooks = async (req, res) => {
  try {
    // Parsing the input object received from the frontend form
    const { searchBy, bookName, author, bookPrice, genre } = req.body;

    // Constructing the query object based on the provided search parameters
    let query = {};

    if (searchBy === "AllBooks") {
        // No specific search parameters, return all books
        console.log("Searching for all books");
      } else if (searchBy === "BookName") {
        query.bookName = bookName;
        console.log("Searching by book name:", bookName);
      } else if (searchBy === "BookAuthor") {
        query.author = author;
        console.log("Searching by book author:", author);
      } else if (searchBy === "BookPrice") {
        query.bookPrice = bookPrice;
        console.log("Searching by book price:", bookPrice);
      } else if (searchBy === "BookGenre") {
        query.genre = genre;
        console.log("Searching by book genre:", genre);
      }      

    // Execute the query to find the books matching the search criteria
    const books = await Book.find(query);
    console.log(books);
    res.json(books);
  }
  catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { ViewBooks };
