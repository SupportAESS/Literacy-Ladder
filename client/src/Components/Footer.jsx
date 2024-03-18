import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full fixed bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Literacy Ladder</p>
          <p className="text-sm">MNNIT Allahabad Campus, Teliarganj, Prayagraj, Uttar Pradesh 211004</p>
          <p className="text-sm">Phone: +91-9415120130</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/about" className="hover:text-gray-300">About Us</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-300">Contact Us</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-300">Privacy Policy</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
