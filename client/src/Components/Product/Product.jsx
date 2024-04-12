import { React, useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
function Product() {
  // const [selectedProduct, setSelectedProduct] = useState(null);

  // const handleCardClick = (product) => {
  //   setSelectedProduct(product);
  // };
  const [productsByGenre, setProductsByGenre] = useState({});
  const genres = ["Fiction", "Action and Adventure", "Mystery", "Science Fiction", "Fantasy", "Horror", "Biography", "Auto-biography", "History", "Self-help", "Science", "Romance"];

  useEffect(() => {
    async function fetchData() {
      try {
        const genreData = {};
        for (const genre of genres) {
          const search = {
            "searchBy": "BookGenre",
            "genre": genre
          }
          const response = await axios.get("http://localhost:2211/viewBook", {
            params: search
          })
          genreData[genre] = response.data;
        }
        setProductsByGenre(genreData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  console.log(productsByGenre);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    vertical: false, // Set vertical to false to make slides appear horizontally
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
    <>
      {genres.map(genre => (
        <div key={genre}>
          <h2 className='text-4xl font-bold'>{genre}</h2>
          <div className='w-11/12 mx-auto'>
            <div className='mt-10 mb-10'>
              <Slider {...settings}>
                {productsByGenre[genre] && productsByGenre[genre].map(product => (
                  <div className='bg-white text-black rounded-xl' key={product.bookName}>
                    <div className='h-60 flex justify-center items-center'>
                      <img src={product.bookImage} alt="" className='rounded-t-xl w-full h-full' />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 p-4'>
                      <p className='text-xl font-semibold'>{product.bookName}</p>
                      <p>{product.bookDescription}</p>
                      <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Add to Card</button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ))}
    </>
  )
};


export default Product