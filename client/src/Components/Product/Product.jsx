import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Product() {
  const [productsByGenre, setProductsByGenre] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const genres = ["Fiction", "Action and Adventure", "Mystery", "Science Fiction", "Fantasy", "Horror", "Biography", "Auto-biography", "History", "Self-help", "Science", "Romance"];

  useEffect(() => {
    async function fetchData() {
      try {
        const genreData = {};
        const genrePromises = genres.map(async (genre) => {
          const search = {
            "searchBy": "BookGenre",
            "genre": genre
          };
          const response = await axios.get("http://localhost:2211/viewBook", {
            params: search
          });
          if (response.data.length > 0) {
            genreData[genre] = response.data;
          }
        });
        await Promise.all(genrePromises);
        setProductsByGenre(genreData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleHover = (product) => {
    setHoveredProduct(product);
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      {Object.keys(productsByGenre).map(genre => (
        <div key={genre} className=''>
          <center><h2 className='text-4xl font-bold px-10 py-1 mt-6'>{genre}</h2></center>
          <div className='w-11/12 mx-auto bg-gray-800 bg-opacity-75 rounded-lg px-8 py-1'>
            <div className='mt-10 mb-10'>
              <Slider
                dots
                infinite={false}
                speed={500}
                slidesToShow={5}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]}
              >
                {productsByGenre[genre].map(product => (
                  <div
                    key={product.bookName}
                    className='relative bg-white text-black rounded-xl overflow-hidden h-80'
                    onMouseEnter={() => handleHover(product)}
                    onMouseLeave={() => handleLeave()}
                  >
                    <img src={product.bookImage} alt="" className='w-full h-full' />
                    {isHovering && hoveredProduct === product && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white text-black p-4">
                        <p className='text-xl font-semibold'>{product.bookName}</p>
                        <p className="text-sm">{product.bookDescription}</p>
                        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl mt-2'>Add to Cart</button>
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;
