import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPanel = ({books}) => {
  //const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.post('http://localhost:2211/viewBook', {});
//       setBooks(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

  return (
    <div>
      <h1>Book List</h1>
      {books.map(book => (
        <div key={book._id}>
          <h2>{book.bookName}</h2>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Price: {book.bookPrice}</p>
          <p>Quantity: {book.bookQuantity}</p>
          <p>Description: {book.bookDescription}</p>
          <img src={book.bookImage} alt={book.bookName} style={{ width: '200px' }} />
        </div>
      ))}
    </div>
  );
};

export default ViewPanel;
