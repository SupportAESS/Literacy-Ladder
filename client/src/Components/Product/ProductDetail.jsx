import React from 'react';

const ProductDetail = ({ product, onClose, onAddToCart, cartItems }) => {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="bg-white p-8 rounded-lg max-w-md z-10 shadow-md">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img className="w-full h-64 object-cover mb-4" src={product.img} alt={product.name} />
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-4">{product.author}</p>
                    <button onClick={() => {
                        onAddToCart(product);
                        onClose(); // Close the modal after adding to cart
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
