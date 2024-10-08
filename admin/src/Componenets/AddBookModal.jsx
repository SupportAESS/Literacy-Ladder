import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function AddBook({ onClose }) {
  const [formData, setFormData] = useState({
    bookName: '',
    author: '',
    genre: '',
    bookQuantity: 0,
    bookPrice: 0,
    bookDescription: '',
    isbn: 0,
    image: null,
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

    // const newData = new FormData(formData)

    // console.log(newData)
    try {
      //let url = isLogin ? '' : 'http://localhost:3000/signup'; // Determine the correct endpoint based on isLogin state
      const response = await axios.post('http://localhost:2211/addBook', formData, {
        headers:{
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
      <div className='w-96 bg-white rounded-md shadow-lg'>
        <Form encType='multipart/form-data' onSubmit={handleSubmit} className='p-6'>
          <Form.Group >
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Book Name" name="bookName" value={formData.bookName} 
            onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
            focus:outline-none focus:border-indigo-500' />
          
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter Author" name="author" value={formData.author} 
            onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
            focus:outline-none focus:border-indigo-500' />
            {/* <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text> */}
          
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Genre</Form.Label>
            <select
              name="genre"
              id="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none 
              focus:border-indigo-500'
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
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
        
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Book Price" name="bookPrice" value={formData.bookPrice} 
            onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
            focus:outline-none focus:border-indigo-500' />
            {/* <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text> */}
         
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Quantity</Form.Label>
            <Form.Control type="number" placeholder="Enter Book Quantity" name="bookQuantity" value={formData.bookQuantity} 
            onChange={handleChange} required className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
            focus:outline-none focus:border-indigo-500' />
            {/* <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text> */}
          
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Description</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Enter Book Description" 
            name="bookDescription" 
            value={formData.bookDescription} 
            onChange={handleChange} 
            required 
            className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
            focus:outline-none focus:border-indigo-500' />
            {/* <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text> */}
            
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>ISBN</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter Book ISBN Number" 
              name="isbn" 
              value={formData.isbn} 
              onChange={handleChange} 
              required 
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
              focus:outline-none focus:border-indigo-500' />

            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Image Attachment</Form.Label>
            <Form.Control 
              type='file' 
              id="imageAttachment" 
              name="image" 
              label="Choose image" 
              onChange={handleImageChange} 
              accept=".jpg,.jpeg,.png" 
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md 
              focus:outline-none focus:border-indigo-500' />
          </Form.Group>

          <div className='mt-6'>
            <Button variant="primary" type="submit" className='w-full font-semibold py-2 text-sm
                 text-white bg-indigo-600 border border-transparent rounded-md
                  hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 
                  focus:shadow-outline-indigo'>
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
  )
}

export default AddBook