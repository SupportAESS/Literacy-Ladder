import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function removeBook({ onClose }) {
  const [formData, setFormData] = useState({
    searchBy: '',
    removeBookBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
    // const sessionData = localStorage.getItem('session');
    // const session = JSON.parse(sessionData);
    // formData.username = session.username;
    console.log(formData);
    try {
      //let url = isLogin ? '' : 'http://localhost:3000/signup'; // Determine the correct endpoint based on isLogin state
      const response = await axios.post('http://localhost:2211/removeBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    }
    catch (error) {
      console.error('Error submitting form:', error);
      // Handle any errors that occur during the form submission process
      throw error;
    }
    
  };
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50'>
      <div className='w-96 bg-white rounded-md shadow-lg'>
        <Form encType='multipart/form-data' onSubmit={handleSubmit} className='p-6'>
        <Form.Group >
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Select By Book Id OR Book Name</Form.Label>
            <select name="searchBy" id="searchBy" value={formData.searchBy} onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'>
            <option value="">Select Genre</option>
              <option value="BookId">Book Id</option>
              <option value="BookName">Book Name</option>
            </select>
          </Form.Group>
          <Form.Group >
            <Form.Control type="text" name="removeBookBy" placeholder={formData.searchBy === "BookId" ? "Enter Book Id" : "Enter Book Name"}  value={formData.removeBookBy} onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' />
          </Form.Group>

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