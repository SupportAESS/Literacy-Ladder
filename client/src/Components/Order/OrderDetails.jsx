import React from 'react';

const OrderDetails = ({ order }) => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className={`inline-block py-1 px-2 text-sm font-semibold ${order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'} rounded-md`}>{order.status}</span>
            <span className="ml-2 text-sm text-gray-600">{order.date}</span>
          </div>
          <div>
            <button className="text-blue-500 hover:text-blue-700">Back to Orders</button>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-gray-800">Product</span>
            </div>
            <div>
              <span className="text-gray-800">Quantity</span>
            </div>
            <div>
              <span className="text-gray-800">Price</span>
            </div>
          </div>
          {order.items.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-2">
              <div>
                <span className="text-gray-800">{item.name}</span>
              </div>
              <div>
                <span className="text-gray-500">{item.quantity}</span>
              </div>
              <div className="text-gray-800">${item.price}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-semibold">Total:</span>
            <span className="text-gray-800 font-semibold">${order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
