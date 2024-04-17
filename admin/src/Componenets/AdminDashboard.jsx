import React, { useState } from 'react';
import AddBookModal from './AddBookModal';
import RemoveBookModal from './RemoveBookModal';
import UpdateBookModal from './UpdateBookModal';
import ViewBookModal from './ViewBookModal';

const AdminDashboard = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showRemoveBookModal, setShowRemoveBookModal] = useState(false);
  const [showUpdateBookModal, setShowUpdateBookModal] = useState(false);
  const [showViewBookModal, setShowViewBookModal] = useState(false);

  const openModal = (modalName) => {
    switch (modalName) {
      case 'addBook':
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

  const logout = () => {
    // Code to destroy session data
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
        <ul className="text-lg">
          <li className="mb-4">
            <button onClick={() => openModal('addBook')} className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md">Add Book</button>
          </li>
          <li className="mb-4">
            <button onClick={() => openModal('removeBook')} className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md">Remove Book</button>
          </li>
          <li className="mb-4">
            <button onClick={() => openModal('updateBook')} className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md">Update Book</button>
          </li>
          <li className="mb-4">
            <button onClick={() => openModal('viewBook')} className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md">View Book</button>
          </li>
          <li>
            <button onClick={logout} className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md">Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Your existing content */}
          {/* Modals */}
          {showAddBookModal && <AddBookModal onClose={closeModal} />}
          {showRemoveBookModal && <RemoveBookModal onClose={closeModal} />}
          {showUpdateBookModal && <UpdateBookModal onClose={closeModal} />}
          {showViewBookModal && <ViewBookModal onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
};

      export default AdminDashboard;
