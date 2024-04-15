import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlArrowDown, SlArrowUp, SlArrowRight } from "react-icons/sl";
import { toast } from 'react-toastify';

const sessionData = JSON.parse(localStorage.getItem('session'));
const refUser = sessionData.user._id;
const Checkout = () => {
    const [showItems, setShowItems] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        selectedAddress: null,
        selectedPaymentMethod: '', // Track the selected payment method
        cartItems: [],
        addresses: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                if (sessionData && sessionData.user) {

                    const addressResponse = await axios.get(`http://localhost:2211/userAddressGet?userId=${refUser}`);
                    if (addressResponse.data && addressResponse.data.ok) {
                        const addresses = addressResponse.data.address.addresses;
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            addresses: addresses,
                            name: sessionData.user.fullName,
                            email: sessionData.user.email,
                            phone: sessionData.user.mobileNumber,
                            selectedAddress: addresses.length > 0 ? addresses[0]._id : null,
                        }));
                    }

                    const cartResponse = await axios.get(`http://localhost:2211/getCartDetails?userId=${refUser}`);
                    //console.log(cartResponse.data);
                    if (cartResponse.status === 200) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            cartItems: cartResponse.data,
                        }));
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Handle address selection
    const handleAddressSelection = (addressId) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            selectedAddress: addressId,
        }));
    };

    // Handle payment method selection
    const handlePaymentMethodSelection = (method) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            selectedPaymentMethod: method,
        }));
    };

    // Handle order confirmation and payment
    // const handleConfirmOrder = async () => {
    //     if(formData.selectedPaymentMethod === ""){
    //         return toast.error("Payment Method Not Selected",{
    //             theme: 'colored'
    //         });
    //     }
    //     try {
    //         // Make a request to the server to process the order and initiate the payment
    //         console.log({userId: refUser,
    //             addressId: formData.selectedAddress,
    //             paymentMethod: formData.selectedPaymentMethod,
    //             cartItems: formData.cartItems.map(item => item.book._id)
    //         });
    //         const response = await axios.post('http://localhost:2211/confirmOrder', {
    //             userId: formData.userId,
    //             addressId: formData.selectedAddress,
    //             paymentMethod: formData.selectedPaymentMethod,
    //             cartItems: formData.cartItems.map(item => item.book._id)
    //         });
    //         if (response.status === 200) {
    //             // Order successfully confirmed and payment initiated
    //             // Optionally, display a success message to the user
    //             console.log('Order confirmed and payment initiated');
    //         } else {
    //             // Handle errors or display an error message
    //             console.error('Failed to confirm order:', response.data);
    //             // Optionally, display an error message to the user
    //         }
    //     } catch (error) {
    //         console.error('Error confirming order:', error);
    //         // Handle errors or display an error message
    //     }
    // };
    const handleConfirmOrder = async () => {
        if(formData.selectedPaymentMethod === ""){
            return toast.error("Payment Method Not Selected",{
                theme: 'colored'
            });
        }
        try {
            // Make a request to the server to process the order and initiate the payment
            // console.log({userId: refUser,
            //     addressId: formData.selectedAddress,
            //     paymentMethod: formData.selectedPaymentMethod,
            //     cartItems: formData.cartItems.map(item => item.book._id),
            //     totalAmount: total
            // });
            const response = await axios.post('http://localhost:2211/confirmOrder', {
                userId: formData.userId,
                addressId: formData.selectedAddress,
                paymentMethod: formData.selectedPaymentMethod,
                cartItems: formData.cartItems.map(item => item.book._id),
                totalAmount: total
            });
            if (response.status === 200) {
                // If payment method is cash on delivery, directly confirm the order
                if (formData.selectedPaymentMethod === 'cash') {
                    confirmOrder(); // Function to confirm order
                    return;
                }
    
                // Otherwise, wait for payment confirmation from the payment API
                const paymentConfirmation = await waitForPaymentConfirmation(response.data.paymentId);
    
                if (paymentConfirmation) {
                    // Payment confirmed, now confirm the order
                    confirmOrder(); // Function to confirm order
                } else {
                    // Payment not confirmed, display an error message to the user
                    console.error('Payment not confirmed');
                }
            } else {
                // Handle errors or display an error message
                console.error('Failed to confirm order:', response.data);
                // Optionally, display an error message to the user
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            // Handle errors or display an error message
        }
    };
    
    // Function to wait for payment confirmation from the payment API
    const waitForPaymentConfirmation = async (paymentId) => {
        try {
            // Make a request to the payment API to check for payment confirmation
            const response = await axios.get(`http://payment-api.com/checkPaymentStatus/${paymentId}`);
            return response.data.paymentConfirmed; // Assuming the payment API returns a boolean indicating payment confirmation
        } catch (error) {
            console.error('Error checking payment status:', error);
            // Handle errors or display an error message
            return false;
        }
    };
    
    // Function to confirm the order after payment confirmation
    const confirmOrder = async () => {
        try {
            // Make a request to the server to confirm the order
            const response = await axios.post('http://localhost:2211/confirmOrder', {
                userId: formData.userId,
                addressId: formData.selectedAddress,
                paymentMethod: formData.selectedPaymentMethod,
                cartItems: formData.cartItems,
            });
    
            if (response.status === 200) {
                // Order confirmed successfully
                // Optionally, display a success message to the user
                console.log('Order confirmed successfully');
            } else {
                // Handle errors or display an error message
                console.error('Failed to confirm order:', response.data);
                // Optionally, display an error message to the user
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            // Handle errors or display an error message
        }
    };
    
    let total = 0;
    return (
        <div className="max-w-6xl mx-auto p-4 mt-16 min-h-screen bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Select Address</h3>
                {formData.addresses.map((address, index) => (
                    <div key={index} className="border rounded p-4 mb-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-blue-500"
                                checked={formData.selectedAddress === address._id}
                                onChange={() => handleAddressSelection(address._id)}
                            />
                            <div className="ml-2">
                                <p className="font-semibold">{address.street}</p>
                                <p>{address.city}, {address.country}</p>
                                <p>{address.state}, {address.postalCode}</p>
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="mb-8 bg-gray-100 p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <button className="text-blue-500" onClick={() => setShowItems(!showItems)}>
                        {showItems ? <SlArrowDown /> /* Downward-pointing triangle */ :  <SlArrowRight />/* Upward-pointing triangle */}
                    </button>
                </div>

                {showItems && (
                    <div>
                        {formData.cartItems.map((item,index) => {
                            return (
                                <div key={index} className="border rounded p-2 mb-2">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.book.bookImage} alt="Book cover" className="w-16 h-24" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.book.bookName}</h3>
                                            <p className="text-gray-500">{item.quantity}</p>
                                            <p className="text-gray-600">Price: ₹{item.book.bookPrice}</p>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <button className="text-red-500">Remove</button>
                                    </div> */}
                                </div>
                            );
                        })}
                    </div>
                )}
                <div>
                    {formData.cartItems.map(item => {
                        total = total + (item.quantity * item.book.bookPrice);
                    })}
                </div>
                <div>
                    <p className="text-lg font-semibold">Total: ₹{total}</p>
                </div>
            </div>
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Payment Method Selection</h3>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="cashOnDelivery"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        checked={formData.selectedPaymentMethod === 'cashOnDelivery'}
                        onChange={() => handlePaymentMethodSelection('cashOnDelivery')}
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                    />
                    <label htmlFor="cashOnDelivery" className="font-semibold cursor-pointer">Cash on Delivery</label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="digitalPayment"
                        name="paymentMethod"
                        value="digitalPayment"
                        checked={formData.selectedPaymentMethod === 'digitalPayment'}
                        onChange={() => handlePaymentMethodSelection('digitalPayment')}
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                    />
                    <label htmlFor="digitalPayment" className="font-semibold cursor-pointer">Digital Payment</label>
                </div>
            </div>

            {/* Button to confirm order */}
            <div className="text-center">
                <button
                    onClick={handleConfirmOrder}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Confirm Order & Make Payment
                </button>
            </div>
        </div>
    );
};

export default Checkout;
