const { Book } = require('../models/userModel');

const ViewBooks = async (req, res) => {
  try {
    
    const searchBy = req.query.searchBy;
    //const { searchBy, bookName, author, minPrice, maxPrice, genre } = req.query;

    // Constructing the query object based on the provided search parameters
    let q = {};

    if (searchBy === "AllBooks") {
      // No specific search parameters, return all books
      console.log("Searching for all books");
    } else if (searchBy === "BookName") {
      q.bookName = req.query.bookName;
      console.log("Searching by book name:", req.query.bookName);
    } else if (searchBy === "BookAuthor") {
      q.author = req.query.author;
      console.log("Searching by book author:", req.query.author);
    } else if (searchBy === "BookPrice") {
      // Construct a price range query using minimum and maximum prices
      q.bookPrice = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
      console.log("Searching by book price range:", req.query.minPrice, "-", req.query.maxPrice);
    } else if (searchBy === "BookGenre") {
      q.genre = req.query.genre;
      console.log("Searching by book genre:", req.query.genre);
    }

    // Execute the query to find the books matching the search criteria
    const books = await Book.find(q);
    //console.log(books);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { ViewBooks };
