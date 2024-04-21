import React, { useEffect, useState } from 'react';
import OrderDetails from '../Order/OrderDetails';
import axios from 'axios';

const OrderPage = () => {
    // const [orders] = useState([
    //     {
    //         id: 1,
    //         status: 'Delivered',
    //         date: 'April 15, 2024',
    //         items: [
    //             { id: 1, name: 'Product 1', quantity: 2, price: 20 },
    //             { id: 2, name: 'Product 2', quantity: 1, price: 30 },
    //         ],
    //         total: 70
    //     },
    //     {
    //         id: 2,
    //         status: 'Processing',
    //         date: 'April 10, 2024',
    //         items: [
    //             { id: 3, name: 'Product 3', quantity: 1, price: 25 },
    //         ],
    //         total: 25
    //     },
    // ]);



    const [Orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const session = localStorage.getItem("session");
            if (session !== null) {
                const userId = JSON.parse(session).user._id;
                const response = await axios.get("http://localhost:2211/getOrders", {
                    params: {userId:userId}
                })
                //console.log(response.data);
                setOrders(response.data);
            }
        }
        fetchData();
    },[])

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToOrders = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {selectedOrder ? (
                <OrderDetails order={selectedOrder} />
            ) : (
                <div>
                    {Orders.map(order => (
                        console.log(order),
                        <div key={order._id} className="bg-white shadow-md rounded-md p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <span className={`inline-block py-1 px-2 text-sm font-semibold ${order.paymentStatus === 'Delivered' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'} rounded-md`}>{order.paymentStatus}</span>
                                    {/* <span className="ml-2 text-sm text-gray-600">{order.date}</span> */}
                                </div>
                                <div>
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewDetails(order)}>View Details</button>
                                </div>
                            </div>
                            <div className="border-t border-gray-300 pt-4">
                                {order.cartItems.map(item => (
                                    <div key={item._id} className="flex items-center justify-between mb-2">
                                        <div>
                                            <span className="text-gray-800">{item.bookName}</span>
                                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
