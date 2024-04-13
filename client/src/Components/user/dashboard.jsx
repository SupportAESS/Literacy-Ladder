import React from 'react';

const UserDashboard = () => {
  return (
    <div className="container">
      <h1>User Dashboard</h1>
      <div className="books-container">
        {/* List of books */}
        <div className="book">
          <img src="book-cover.jpg" alt="Book Cover" />
          <div className="book-details">
            <h2>Title: Book Title</h2>
            <p>Author: Author Name</p>
            <p>Price: $20</p>
            {/* Other book details */}
            <button>Add to Cart</button>
          </div>
        </div>
        {/* Repeat the book structure for each book */}
      </div>
    </div>
  );
};

export default UserDashboard;
