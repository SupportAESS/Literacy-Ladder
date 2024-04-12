import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function removeBook({ onClose }) {
  const [formData, setFormData] = useState({
    deleteBy: '',
    fieldValue: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
    try {
      //let url = isLogin ? '' : 'http://localhost:3000/signup'; // Determine the correct endpoint based on isLogin state
      // const response = await axios.delete('http://localhost:2211/removeBook', formData);
      const response = await axios.delete('http://localhost:2211/removeBook', {
        data: formData
      });

      // Check if the request was successful
      if (!response.ok) {
        console.log("Issue with server ");
      }
      else {
        // Handle successful response
        console.log('Delete request successful');
      }

    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Book not found");
      } else {
        console.error('Error submitting form:', error);
        throw error;
      }
    }

  };
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50'>
      <div className='w-96 bg-white rounded-md shadow-lg'>
        <Form encType='multipart/form-data' onSubmit={handleSubmit} className='p-6'>
          <Form.Group>
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Select Deletion Criteria </Form.Label>
            <select name="deleteBy" id="deleteBy" value={formData.deleteBy} onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'>
              <option value="" >Select</option>
              <option value="bookName">Book Name</option>
              <option value="isbn">ISBN Number</option> {/* Added option for ISBN */}
            </select>
          </Form.Group>
          {formData.deleteBy === "bookName" &&
            ( // Render input field for Book Name if selected 
              <Form.Group>
                <Form.Control
                  type="text"
                  name="fieldValue"
                  placeholder="Enter Book Name"
                  value={formData.bookName}
                  onChange={handleChange}
                  required
                  className='my-2 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
                  focus:outline-none focus:border-indigo-500'
                />
              </Form.Group>
            )}
          {formData.deleteBy === "isbn" &&
            ( //Render input field for ISBN if selected 
              <Form.Group>
                <Form.Control
                  type="number"
                  name="fieldValue"
                  placeholder="Enter ISBN"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                  className='my-2 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
                  focus:outline-none focus:border-indigo-500'
                />
              </Form.Group>
            )}
          <div className='mt-6'>
            <Button variant="primary" type="submit" className='w-full font-semibold py-2 text-sm
                  text-white bg-indigo-600 border border-transparent rounded-md
                    hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo'>
              Submit
            </Button>
            <Button variant="danger" onClick={onClose}
              className='mt-3 w-full py-2 text-sm font-semibold 
                    text-white border border-gray-300 rounded hover:bg-red-600 focus:outline-none
                    focus:text-gray-500 focus:border-gray-500'
            >
              Close
            </Button>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default removeBook