import React, { useState, useEffect, useRef } from 'react'; // Add useRef here
import { Form, Button, Table } from 'react-bootstrap'; // Import Table from react-bootstrap
import axios from 'axios';

function ViewBook({ onClose }) {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    searchBy: '',
    bookName: '',
    author: '',
    genre: '',
    minPrice: '',
    maxPrice: ''
  });

  const bookListRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:2211/viewBook', {
        params: formData
      });
      if (response.status === 200) {
        setBooks(response.data); // Assuming the response data is an array of books
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the book list when books change
    bookListRef.current.scrollTop = bookListRef.current.scrollHeight;
  }, [books]);

  return (

    <div className='w-fit bg-white rounded-md shadow-lg flex h-screen' style={{ maxWidth: '500%',maxHeight: '930px', overflowY: 'auto' }}>
      <Form onSubmit={handleSubmit} className='p-6'>
        <Form.Group>
          <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Search By</Form.Label>
          <select
            name="searchBy"
            value={formData.searchBy}
            onChange={handleChange}
            required
            className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          >
            <option value="">Select Search Options</option>
            <option value="AllBooks">All Books</option>
            <option value="BookName">Book Name</option>
            <option value="BookAuthor">Book Author</option>
            <option value="BookGenre">Book Genre</option>
            <option value="BookPrice">Book Price</option>
          </select>
        </Form.Group>

        {formData.searchBy === "BookName" && (
          <Form.Group>
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Name"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              required
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
            />
          </Form.Group>
        )}

        {formData.searchBy === "BookAuthor" && (
          <Form.Group>
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
            />
          </Form.Group>
        )}

        {formData.searchBy === "BookGenre" && (
          <Form.Group>
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Genre</Form.Label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
            >
              <option value="">Select</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Action and Adventure">Action and Adventure</option>
              <option value="Mystery">Mystery</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Biography">Biography</option>
              <option value="Auto-biography">Auto-biography</option>
              <option value="History">History</option>
              <option value="Self-help">Self-help</option>
              <option value="Science">Science</option>
              <option value="Romance">Romance</option>
            </select>
          </Form.Group>
        )}

        {formData.searchBy === "BookPrice" && (
          <div>
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Minimum Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Minimum Price"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
                required
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Maximum Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Maximum Price"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleChange}
                required
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
              />
            </Form.Group>
          </div>
        )}


        <div className='mt-6'>
          <Button variant="primary" type="submit" className='w-full font-semibold py-2 text-sm text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo'>
            Submit
          </Button>
          <Button variant="danger" onClick={onClose} className='mt-3 w-full py-2 text-sm font-semibold text-white border border-gray-300 rounded hover:bg-red-600 focus:outline-none focus:text-gray-500 focus:border-gray-500'>
            Close
          </Button>
        </div>
      </Form>

      <div className="mt-6" ref={bookListRef} style={{ maxHeight: '720px', overflowY: 'auto' }}>
        <h1>Book List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>ISBN</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.bookPrice}</td>
                <td>{book.bookQuantity}</td>
                <td>{book.isbn}</td>
                <td>{book.bookDescription}</td>
                <td><img src={book.bookImage} alt={book.bookName} style={{ width: '100px' }} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>

  );
}

export default ViewBook;
