import React from 'react';

const Cart = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        {/* Cart items */}
        <div className="divide-y divide-gray-200">
          {/* Single cart item */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/150" alt="Book cover" className="w-16 h-24" />
              <div>
                <h3 className="text-lg font-semibold">Book Title</h3>
                <p className="text-gray-500">Author Name</p>
                <p className="text-gray-600">Price: ₹10</p>
              </div>
            </div>
            <div>
              <button className="text-red-500">Remove</button>
            </div>
          </div>
          {/* End of single cart item */}
          {/* Repeat this structure for each item in the cart */}
        </div>
        {/* End of cart items */}
        {/* Cart summary */}
        <div className="p-4 flex items-center justify-between bg-gray-100">
          <p className="text-lg font-semibold">Total: ₹50</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Checkout</button>
        </div>
        {/* End of cart summary */}
      </div>
    </div>
  );
};

export default Cart;
