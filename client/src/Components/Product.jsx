import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';

function Product() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const generateBooks = (genre, genreIndex) => {
        const books = [];
        for (let i = 1; i <= 12; i++) {
            const book = {
                name: `${genre} Book ${i}`,
                img: `https://via.placeholder.com/300x400?text=${genreIndex}_${i}`,
                author: `Author ${i}`,
                genre: genre
            };
            books.push(book);
        }
        return books;
    };
    
    const genres = [
        'Fiction',
        'Non-fiction',
        'Action and Adventure',
        'Mystery',
        'Science Fiction',
        'Fantasy',
        'Horror',
        'Biography',
        'Auto-biography',
        'History',
        'Self-help',
        'Science',
        'Romance'
    ];
    
    let data = [];
    genres.forEach((genre, index) => {
        data = [...data, ...generateBooks(genre, index + 1)];
    });
    
    useEffect(() => {
        const handleCloseModal = (event) => {
            if (event.keyCode === 27) { // Close modal on ESC key press
                setSelectedProduct(null);
            }
        };

        window.addEventListener('keydown', handleCloseModal);

        return () => {
            window.removeEventListener('keydown', handleCloseModal);
        };
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        console.log('Adding to cart:', product);
    };

    return (
        <div className="p-6">
            {/* Render products for each genre */}
            {genres.map((genre, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">{genre}</h2>
                    <div className="flex overflow-x-auto max-w-full space-x-4">
                        {/* Filter products based on genre */}
                        {data.filter(product => product.genre === genre).map((product, index) => (
                            <div key={index} className="max-w-[200px] w-[20%] rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105">
                                <img className="w-full h-32 object-cover rounded-t-lg" src={product.img} alt={product.name} onClick={() => handleProductClick(product)} />
                                <div className="bg-gray-100 p-4 rounded-b-lg">
                                    <div className="font-semibold text-lg mb-2 text-gray-800">{product.name}</div>
                                    <p className="text-gray-600 text-sm">{product.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Render product detail modal */}
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleCloseModal}>
                    <div className="bg-white p-8 rounded-lg max-w-md">
                        <ProductDetail product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;
