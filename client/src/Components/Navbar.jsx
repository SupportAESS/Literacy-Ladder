import React, { useState } from 'react';
import logo from '../asset/logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex-none">
              <a href="/" className="text-white flex">
                <img src = {logo} className='w-20'></img>
                <h1 className='hidden md:block self-center text-xl font-bold'>Literacy Ladder</h1>
              </a>
            </div>
            {/* Search bar */}
            <div className="flex-auto justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-7xl w-full lg:max-w-7xl">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M18.293 15.707a1 1 0 01-1.414 1.414l-4.3-4.3a6 6 0 
                        111.414-1.414l4.3 4.3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <input id="search" name="search" className="block max-w-max pl-10 pr-3 py-2 border border-transparent 
                    rounded-md leading-5 bg-gray-500 text-white placeholder-gray-400 focus:outline-none
                    focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:ring-0 sm:text-sm" 
                    placeholder="Search" type="search"/>
                  </div>
                </div>
            </div>
            <div className="hidden flex-auto items-center md:block">
              {/* Home cart About account */}
              <div className="object-none object-center ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  Home
                </a>
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                  About
                </a>
                <a href="/" className="flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                Account
                </a>
                <a href="/" className="flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 
                rounded-md text-lg font-medium">
                Cart
                </a>
              </div>
            </div>
          
          <div className="-mr-2 flex md:hidden ">
            <button onClick={toggleNavbar} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <a href="#" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 
          rounded-md text-base font-medium">Home</a>
          <a href="#" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 
          rounded-md text-base font-medium">About</a>
          <a href="#" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 
          rounded-md text-base font-medium">Account</a>
          <a href="#" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 
          rounded-md text-base font-medium">Cart</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
