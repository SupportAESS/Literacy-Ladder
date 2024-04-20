import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { HiSearch } from 'react-icons/hi';

function Slider() {
  const slides = [
    {
      url: 'https://alsharaypucollege.com/wp-content/uploads/2016/05/Books-banner.png'
    },
    {
      url: 'https://media.istockphoto.com/id/1173671270/photo/a-stack-of-leather-bound-books-with-gold-decoration.webp?s=2048x2048&w=is&k=20&c=q5PZ1fzdheODYcl0Uks9eprRCYWrlR7mysAL1-SK7yE='
    },
    {
      url: 'https://media.istockphoto.com/id/1189397041/photo/old-books-on-wooden-shelf.webp?s=2048x2048&w=is&k=20&c=EFRXRQD9i7tQrRgJN9QbOrK2zwASDHjRFxxPG9m78ws='
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [filteredSlides, setFilteredSlides] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const onChange = (event) => {
    const searchTerm = event.target.value;
    setSearchValue(searchTerm);
    const filtered = slides.filter(slide =>
      slide.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSlides(filtered);
    setShowSearchResults(searchTerm !== '' && filtered.length > 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="p-4">
      <div className="relative">
        <div
          className="w-full h-[360px] md:h-[480px] bg-gray-200 overflow-hidden rounded-lg relative"
          style={{ backgroundImage: `url(${slides[currentIndex].url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        >
          {/* Search Bar */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 rounded-lg px-4 py-2 w-3/5 flex items-center">
            <button onClick={onChange}><HiSearch className="text-white mr-2" /></button>
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-white"
              value={searchValue}
              onChange={onChange}
            />
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition duration-300 focus:outline-none"
          >
            <BsChevronLeft size={30} />
          </button>
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition duration-300 focus:outline-none"
          >
            <BsChevronRight size={30} />
          </button>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <ul className="text-white">
            {filteredSlides.map((slide, index) => (
              <li key={index}>{slide.url}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Slider;
