import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
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
                const sessionData = JSON.parse(localStorage.getItem('session'));
                if (sessionData && sessionData.user) {
                    const refUser = sessionData.user._id;

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

                    const cartResponse = await axios.get(`http://localhost:2211/getUserCart?userId=${refUser}`);
                    if (cartResponse.status === 200) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            cartItems: cartResponse.data.cartItems,
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
    const handleConfirmOrder = async () => {
        try {
            // Make a request to the server to process the order and initiate the payment
            const response = await axios.post('http://localhost:2211/confirmOrder', {
                userId: formData.userId,
                addressId: formData.selectedAddress,
                paymentMethod: formData.selectedPaymentMethod,
                cartItems: formData.cartItems,
            });
            if (response.status === 200) {
                // Order successfully confirmed and payment initiated
                // Optionally, display a success message to the user
                console.log('Order confirmed and payment initiated');
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

    return (
        <div className="max-w-md mx-auto p-4 mt-16 min-h-screen bg-gray-100 p-6 rounded-lg">
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

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                {formData.cartItems.map(item => (
                    <div key={item.productId} className="border rounded p-2 mb-2">
                        <p>{item.productName}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
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
                        id="debitCreditCard"
                        name="paymentMethod"
                        value="debitCreditCard"
                        checked={formData.selectedPaymentMethod === 'debitCreditCard'}
                        onChange={() => handlePaymentMethodSelection('debitCreditCard')}
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                    />
                    <label htmlFor="debitCreditCard" className="font-semibold cursor-pointer">Debit Card / Credit Card</label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.selectedPaymentMethod === 'upi'}
                        onChange={() => handlePaymentMethodSelection('upi')}
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                    />
                    <label htmlFor="upi" className="font-semibold cursor-pointer">UPI</label>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="netBanking"
                        name="paymentMethod"
                        value="netBanking"
                        checked={formData.selectedPaymentMethod === 'netBanking'}
                        onChange={() => handlePaymentMethodSelection('netBanking')}
                        className="form-radio h-5 w-5 text-blue-500 mr-2"
                    />
                    <label htmlFor="netBanking" className="font-semibold cursor-pointer">Net Banking</label>
                </div>
                {/* Add other payment methods similarly */}
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
