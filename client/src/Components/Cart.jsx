import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = localStorage.getItem("session");
      let items;

      if (session !== null) {
        // If session is set, fetch data from the backend API
        try {
          const userId = JSON.parse(session).user._id;
          const response = await axios.get('http://localhost:2211/getCartDetails',{
            params: {userId:userId}
          });
          console.log(response.data);
          items = response.data;
          setCartItems(items);
        } catch (error) {
          console.error("Error fetching cart items: ", error);
          // Handle error
        }
      } else {
        // If session is not set, use data from localStorage
        items = JSON.parse(localStorage.getItem("userData"));
        //console.log(JSON.parse(JSON.stringify(items.cartItem)));
        setCartItems(JSON.parse(JSON.stringify(items.cartItem)));
      }
      //console.log(items);
      
    };

    fetchData();
  }, []);

  let total = 0;

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item, index) => (
            // No semicolon here and wrap the expression inside curly braces
            total = total + (item.quantity * item.book.bookPrice),
            <div key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <img src={item.book.bookImage} alt="Book cover" className="w-16 h-24" />
                <div>
                  {/* Assuming you have an endpoint to fetch book details */}
                  <h3 className="text-lg font-semibold">{item.book.bookName}</h3>
                  <p className="text-gray-500">{item.quantity}</p>
                  <p className="text-gray-600">Price: ₹{item.book.bookPrice}</p>
                </div>
              </div>
              <div>
                <button className="text-red-500">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex items-center justify-between bg-gray-100">
          <p className="text-lg font-semibold">Total: ₹{total}</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
