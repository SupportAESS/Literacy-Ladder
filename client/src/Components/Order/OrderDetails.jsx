import React from 'react';
import moment from 'moment';

const OrderDetails = ({ order }) => {
    // Calculate shipping charge (static value of 10 rupees)
    const shippingCharge = 10;
    // Calculate discount (5% of total amount)
    const discount = order.totalAmount * 0.0005;
    // Calculate GST (18% of subtotal + shipping charge after discount)
    const subtotalAfterDiscount = order.totalAmount * 0.01 - discount;
    const gst = (subtotalAfterDiscount + shippingCharge) * 0.18;

    // Extract address details from the order
    const { street, city, state, postalCode, country } = order.address.addresses[0];
    // Shipped from address
    const shippedFromAddress = (
        <>
            Literacy Ladder, <br/>
            Computer Science and Engineering Department,<br />
            MNNIT, {city}, {postalCode}<br />
            {state}, {country}
        </>
    );

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Invoice</h1>
                    <div>
                        <span className="text-gray-600">Order Number: {order._id}</span>
                        <br />
                        <span className="text-gray-600">Date: {moment(order.timeStamp).format('MMMM, Do YYYY')}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-left">
                        <p className="text-gray-800 font-semibold">Shipped from:</p>
                        <p className="text-gray-800 font-sans">{shippedFromAddress}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-800 font-semibold">Delivered to:</p>
                        <div className="text-gray-800 font-sans">
                            <p>{street}</p>
                            <p>{city}, {state}, {postalCode}</p>
                            <p>{country}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Product</span>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-800 font-semibold">Quantity</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800 font-semibold">Price</span>
                        </div>
                    </div>
                    {order.cartItems.map(item => (
                        <div key={item._id} className="grid grid-cols-3 gap-4 items-center mb-2">
                            <div className="text-left">
                                <span className="text-gray-800">{item.bookId.bookName}</span>
                                <p className="text-gray-500">{item.bookId.author}</p>
                            </div>
                            <div className="text-center">
                                <span className="text-gray-500">{item.quantity}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-gray-800">₹{item.bookId.bookPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Subtotal:</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">₹{(order.totalAmount * 0.01 - shippingCharge + discount - gst).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Shipping Charge:</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">₹{shippingCharge.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Discount (5%):</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">-₹{discount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">GST (18%):</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800">₹{gst.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-left">
                            <span className="text-gray-800 font-semibold">Total:</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-800 font-semibold">₹{(order.totalAmount * 0.01).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
