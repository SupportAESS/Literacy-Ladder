import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsTrash, BsPlus, BsDash } from 'react-icons/bs';

import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = localStorage.getItem("session");

      if (session !== null) {
        // If session is set, fetch data from the backend API
        try {
          const userId = JSON.parse(session).user._id;
          const response = await axios.get('http://localhost:2211/getCartDetails', {
            params: { userId: userId }
          });
          //console.log(response.data);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items: ", error);
          // Handle error
        }
      } else {
        // If session is not set, use data from localStorage
        const items = JSON.parse(localStorage.getItem("userData"));
        //console.log(JSON.parse(JSON.stringify(items.cartItem)));
        setCartItems(JSON.parse(JSON.stringify(items.cartItem)));
      }
    };

    fetchData();
  }, []);

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity <= 0) {
      deleteItem(index);
      return;
    }

    const updatedCartItem = { ...cartItems[index], quantity: newQuantity };

    try {
      await axios.put('http://localhost:2211/updateCartItem', updatedCartItem);
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedCartItem;
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating quantity: ", error);
      // Handle error
    }
  };

  const deleteItem = async (index) => {
    const deletedCartItem = cartItems[index];
    try {
      await axios.delete('http://localhost:2211/deleteCartItem', { data: deletedCartItem });
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error deleting item: ", error);
      // Handle error
    }
  };

  let total = 0;

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item, index) => (
            total = total + (item.quantity * item.book.bookPrice),
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img src={item.book.bookImage} alt="Book cover" className="w-16 h-24" />
                <div>
                  <h3 className="text-lg font-semibold">{item.book.bookName}</h3>
                  <p className="text-gray-500">{item.quantity}</p>
                  <p className="text-gray-600">Price: ₹{item.book.bookPrice}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => updateQuantity(index, item.quantity - 1)} className="text-red-500"><BsDash /></button>
                <button onClick={() => updateQuantity(index, item.quantity + 1 > item.book.bookQuantity ? item.quantity : item.quantity + 1)} className="text-green-500"><BsPlus /></button>
                <button onClick={() => deleteItem(index)} className="text-red-500"><BsTrash /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex items-center justify-between bg-gray-100">
          <p className="text-lg font-semibold">Total: ₹{total}</p>
          <Link to="/cart/checkout" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
