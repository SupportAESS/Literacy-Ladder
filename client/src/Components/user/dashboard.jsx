import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import UserAddress from './userAddress';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState('orders');

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData.user);
    } else {
      // Handle user not logged in
      // Redirect to login page or show a message
    }
  }, []);

  const getUserData = () => {
    const sessionData = localStorage.getItem('session');
    // console.log(sessionData);
    return sessionData ? JSON.parse(sessionData) : null;
  };

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
  };

  return (
    <div className="container mx-auto mt-20 flex bg-gray-300">
      <div className="w-1/5 h-screen bg-gray-800 mr-4">
        <ul className="mt-4">
          <li className={`py-2 px-4 cursor-pointer ${selectedNavItem === 'orders' && 'bg-blue-500 text-white'}`} onClick={() => handleNavItemClick('orders')}>
            <Link to="#">My Orders</Link>
          </li>
          <li className={`py-2 px-4 cursor-pointer ${selectedNavItem === 'address' && 'bg-blue-500 text-white'}`} onClick={() => handleNavItemClick('address')}>
            <Link to="#">Address</Link>
          </li>
          <li className={`py-2 px-4 cursor-pointer ${selectedNavItem === 'details' && 'bg-blue-500 text-white'}`} onClick={() => handleNavItemClick('details')}>
            <Link to="#">Personal Details</Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4">
        <div>
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          {user ? (
            <div>
              {selectedNavItem === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold mb-2">My Orders</h2>
                  {user.orders && user.orders.length > 0 ? (
                    <ul>
                      {user.orders.map(order => (
                        <li key={order.id}>
                          <Link to={`/orders/${order.id}`}>{order.title}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              )}
              {selectedNavItem === 'address' && (
                <div>
                  <UserAddress />
                </div>
              )}
              {selectedNavItem === 'details' && (
                <div>
                  <h2 className="text-xl font-bold mb-2">Personal Details</h2>
                  <p>Name: {user.fullName}</p>
                  <p>Email: {user.email}</p>
                  {/* Add more user details as needed */}
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
