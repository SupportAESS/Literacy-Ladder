import React, { useState } from 'react';
import AddBookModal from './AddBookModal'; // Import the correct component

const AdminDashboard = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showRemoveBookModal, setShowRemoveBookModal] = useState(false);
  const [showUpdateBookModal, setShowUpdateBookModal] = useState(false);
  const [showViewBookModal, setShowViewBookModal] = useState(false);

  const openModal = (modalName) => {
    switch (modalName) {
      case 'addBook':
        console.log("add Books");
        setShowAddBookModal(true);
        break;
      case 'removeBook':
        setShowRemoveBookModal(true);
        break;
      case 'updateBook':
        setShowUpdateBookModal(true);
        break;
      case 'viewBook':
        setShowViewBookModal(true);
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setShowAddBookModal(false);
    setShowRemoveBookModal(false);
    setShowUpdateBookModal(false);
    setShowViewBookModal(false);
  };

  return (
    <div className="p-8 bg-gray-100">
      <center><h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1></center>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* User Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div id="user-list" className="mb-4">
            {/* User list will be populated dynamically */}
          </div>
          <button className="button bg-blue-500 text-white">Add User</button>
        </div>

        {/* Book Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Book Management</h2>
          <div id="book-list" className="mb-4">
            {/* Book list will be populated dynamically */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => openModal('addBook')} className="button bg-green-500 text-white">Add Book</button>
            <button onClick={() => openModal('removeBook')} className="button bg-red-500 text-white">Remove Book</button>
            <button onClick={() => openModal('updateBook')} className="button bg-yellow-500 text-white">Update Book</button>
            <button onClick={() => openModal('viewBook')} className="button bg-purple-500 text-white">View Book</button>
          </div>
        </div>

        {/* Sales Data Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales Data</h2>
          <div id="filter" className="mb-4">
            {/* Sales data filter */}
          </div>
          <div id="purchase-list" className="mb-4">
            {/* Purchase history will be populated dynamically */}
          </div>
          <div id="sales-chart-container">
            {/* Sales chart */}
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <div id="add-book-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 className="text-xl font-semibold mb-4">Add Book</h2>
            {/* Render the AddBookModal component here */}
            <p></p>
            <AddBookModal />
          </div>
        </div>
      )}

      {/* Remove Book Modal */}
      {showRemoveBookModal && (
        <div id="remove-book-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 className="text-xl font-semibold mb-4">Remove Book</h2>
            {/* Remove Book Form */}
          </div>
        </div>
      )}

      {/* Update Book Modal */}
      {showUpdateBookModal && (
        <div id="update-book-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 className="text-xl font-semibold mb-4">Update Book</h2>
            {/* Update Book Form */}
          </div>
        </div>
      )}

      {/* View Book Modal */}
      {showViewBookModal && (
        <div id="view-book-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 className="text-xl font-semibold mb-4">View Book</h2>
            {/* View Book List */}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
