import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function removeBook({ onClose }) {
  const [formData, setFormData] = useState({
    updateFields: '',
    bookId: '',
    bookName: '',
    author: '',
    genre: '',
    bookQuantity: '',
    bookPrice: '',
    bookISBN:'',
    bookDescription: '',
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
    console.log(formData);
    try {
      const response = await axios.put('http://localhost:2211/updateBookDetails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      if(response.status === 200){
        toast.success('Book updated successfully', {
          theme: 'colored'
        });
        
        onClose();
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Book not found",{
          theme: 'colored'
        });
      } else {
        toast.error("Internal Server Error",{
          theme:'colored'
        })
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
            <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Select Field For Update</Form.Label>
            <select
              name="updateFields"
              id="updateFields"
              value={formData.updateFields}
              onChange={handleChange}
              required
              className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
            >
              <option value="">Select </option>
              <option value="AllFields">All Fields</option>
              <option value="BookName">Book Name</option>
              <option value="BookAuthor">Book Author</option>
              <option value="BookGenre">Book Genre</option>
              <option value="BookQuantity">Book Quantity</option>
              <option value="BookPrice">Book Price</option>
              <option value="BookISBN">Book ISBN</option>
              <option value="BookDescription">Book Description</option>
              <option value="BookImage">Book Image</option>
            </select>
          </Form.Group>

          <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Book Id" 
                name="bookId" 
                value={formData.bookId} 
                onChange={handleChange} 
                required 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' 
              />
              <Form.Text className="text-xs text-gray-500">*This field is mandatory.</Form.Text>
            </Form.Group>

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookName") && (
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

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookAuthor") && (
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

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookGenre") && (
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Genre</Form.Label>
              <select 
                name="genre" 
                id="genre" 
                value={formData.genre} 
                onChange={handleChange} 
                required 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
              >
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

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookPrice") && (
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Price</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter Book Price" 
                name="bookPrice" 
                value={formData.bookPrice} 
                onChange={handleChange} 
                required 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' 
              />
            </Form.Group>
          )}

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookQuantity") && (
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Quantity</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter Book Quantity" 
                name="bookQuantity" 
                value={formData.bookQuantity} 
                onChange={handleChange} 
                required 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' 
              />
            </Form.Group>
          )}

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookISBN") && (
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book ISBN</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter Book ISBN" 
                name="bookISBN" 
                value={formData.bookISBN} 
                onChange={handleChange} 
                required 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' 
              />
            </Form.Group>
          )}

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookDescription") && (
            <Form.Group>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Book Description</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Book Description" 
                name="bookDescription" 
                value={formData.bookDescription} 
                onChange={handleChange} 
                required 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' 
              />
            </Form.Group>
          )}

          {(formData.updateFields === "AllFields" || formData.updateFields === "BookImage") && (
            <Form.Group className='mt-4'>
              <Form.Label className='block mb-1 text-base font-bold text-gray-700'>Image Attachment</Form.Label>
              <Form.Control 
                type='file' 
                id="imageAttachment" 
                name="image" 
                label="Choose image" 
                onChange={handleImageChange} 
                accept=".jpg,.jpeg,.png" 
                className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500' 
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