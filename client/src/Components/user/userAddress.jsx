import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from 'axios';
import { toast } from 'react-toastify';

function AddAddressForm({ onSubmit }) {
    const [address, setAddress] = useState({
        refUser: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        isDefault: false,
        mobileNumber: '',
        alternativeMobileNumber: ''
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        const sessionData = localStorage.getItem('session');
        const data = JSON.parse(sessionData);
        address.refUser = data.user._id;

        e.preventDefault();
        onSubmit(address);
        setAddress({
            refUser: '',
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            isDefault: false,
            mobileNumber: '',
            alternativeMobileNumber: ''
        });
        console.log(address);
        try {
            const response = axios.post('http://localhost:2211/userAddressSave', address);
            if (response.status === 200) {
                toast.success("Success Address Added", {
                    theme: 'colored'
                });
            }

        } catch (e) {
            toast.error(e, {
                theme: 'colored'
            })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="street" className="block text-gray-700">Street:</label>
                <input type="text" id="street" name="street" value={address.street} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700">City:</label>
                <input type="text" id="city" name="city" value={address.city} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="state" className="block text-gray-700">State:</label>
                <input type="text" id="state" name="state" value={address.state} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="country" className="block text-gray-700">Country:</label>
                <input type="text" id="country" name="country" value={address.country} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="postalCode" className="block text-gray-700">Postal Code:</label>
                <input type="number" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number:</label>
                <input type="number" id="mobileNumber" name="mobileNumber" value={address.mobileNumber} onChange={handleChange} required className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="alternativeMobileNumber" className="block text-gray-700">Alternative Mobile Number <span className="text-red-500">*</span>:</label>
                <input type="number" id="alternativeMobileNumber" name="alternativeMobileNumber" value={address.alternativeMobileNumber} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                <p className="text-sm text-gray-500">*Optional</p>
            </div>
            <div className="mb-4">
                <label htmlFor="isDefault" className="flex items-center">
                    <input type="checkbox" id="isDefault" name="isDefault" checked={address.isDefault} onChange={() => setAddress({ ...address, isDefault: !address.isDefault })} className="mr-2" />
                    <span className="text-gray-700">Default Address</span>
                </label>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Address</button>
            <p className="mt-2 text-sm text-gray-500">Note: Fields marked with <span className="text-red-500">*</span> are optional.</p>
        </form>


    );
}

function UserAddress() {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    useEffect(() => {
        const userData = getUserData();
        userData.then(value => {
            console.log(value.addresses); // Output: "8435963744"
            if (value.addresses) {
                setUser(value.addresses);
                if (value.addresses) {
                    setAddresses(value.addresses);
                } else {
                    setAddresses([]);
                }
            } else {
                // Handle user not logged in
                // Redirect to login page or show a message
            }
        }).catch(error => {
            console.error(error);
        });
        console.log(userData);
    }, []);

    const getUserData = async () => {
        const sessionData = localStorage.getItem('session');
        const s = JSON.parse(sessionData);
        const refUser = s.user._id;

        try {
            const response = await axios.get(`http://localhost:2211/userAddressGet?userId=${refUser}`);

            if (response.data && response.data.ok) {
                return response.data.address; // Return the actual response data
            }
        } catch (e) {
            console.log(e);
        }

        return null; // Return null if there's an error or no session data
    };

    const deleteAddress = async (addressId) => {
        console.log(addressId);
        const deleteAddress = {
            "addressId": addressId
        }
        try {
            const response = await axios.delete(`http://localhost:2211/deleteAddress/`,{
                data: deleteAddress
              });
            if (response.status === 200) {
                // Address deleted successfully from the server
                // Remove the address from the state
                const updatedAddresses = addresses.filter(address => address._id !== addressId);
                setAddresses(updatedAddresses);
                // Optionally, display a success message to the user
                console.log('Address deleted successfully');
            } else {
                // Handle errors or display an error message
                console.error('Failed to delete address:', response.data);
                // Optionally, display an error message to the user
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            // Handle errors or display an error message
        }
    };
    
    

    const addAddress = (newAddress) => {
        // Assuming you have a function to post the new address to the backend
        // Replace this with your actual API call to post the data to the server
        // Also, assuming the backend returns the updated user data with the new address included
        // Here, we just update the state with the new address
        setAddresses([...addresses, newAddress]);
        setShowForm(false); // Close the form after adding the address
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Addresses</h2>
            <div className="mb-4">
                <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {showForm ? 'Hide Form' : 'Add Address'}
                </button>
            </div>
            {showForm && <AddAddressForm onSubmit={addAddress} />}
            <div>
                {addresses && addresses.map((address, index) => (
                    <div key={index} className="border border-gray-300 p-4 my-4 rounded-lg">
                        <p><strong className="text-blue-700">Street:</strong> {address.street}</p>
                        <p><strong className="text-blue-700">City:</strong> {address.city}</p>
                        <p><strong className="text-blue-700">State:</strong> {address.state}</p>
                        <p><strong className="text-blue-700">Country:</strong> {address.country}</p>
                        <p><strong className="text-blue-700">Postal Code:</strong> {address.postalCode}</p>
                        <p><strong className="text-blue-700">Is Default:</strong> {address.isDefault ? 'Yes' : 'No'}</p>
                        <p><strong className="text-blue-700">Mobile Number:</strong> {address.mobileNumber}</p>
                        <p><strong className="text-blue-700">Alternative Mobile Number:</strong> {address.alternativeMobileNumber}</p>
                        <button onClick={() => deleteAddress(address._id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserAddress;
