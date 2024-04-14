import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        selectedAddress: null, // Track the selected address
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
                            selectedAddress: addresses.length > 0 ? addresses[0]._id : null, // Set the default selected address
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

    return (
        <div className="max-w-md mx-auto p-4 mt-16 min-h-screen">
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
            </div>
        </div>
    );
};

export default Checkout;
