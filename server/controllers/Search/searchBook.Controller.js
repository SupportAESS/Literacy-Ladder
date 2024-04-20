const { Book } = require('../../models/userModel.js');

const searchBook = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    // Escape special characters in the search query and create a regular expression for partial match
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexQuery = new RegExp(escapedQuery, 'i');

    // Search for books with partial matching book names or author names
    const searchResults = await Book.find({
      $or: [
        { bookName: { $regex: regexQuery } },
        { author: { $regex: regexQuery } }
      ]
    });

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { searchBook };

