import {React, useState} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };
  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
    <h1 className='text-4xl font-bold'>Book</h1>
    <div className='w-11/12 mx-auto'>
      <div className='mt-10 mb-10'>
        <Slider {...settings}>
          {data.map((d) => (
            <div className='bg-white text-black rounded-xl'>
              <div className='h-60 flex justify-center items-center'>
                <img src={d.img} alt="" className='rounded-t-xl w-full h-full'/>          
              </div>
              <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p className='text-xl font-semibold'>{d.name}</p>
                <p>{d.desc}</p>
                <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Add to Card</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>  
    </div>
    </>
  )
}
const data = [
  {
    name:"abc",
    img:"https://img.freepik.com/free-photo/decorative-reading-concept_23-2147690510.jpg?size=626&ext=jpg&ga=GA1.1.1595312299.1711267404&semt=ais",
    desc:"xyz"
  },
  {
    name:"abc",
    img:"https://img.freepik.com/free-photo/decorative-reading-concept_23-2147690510.jpg?size=626&ext=jpg&ga=GA1.1.1595312299.1711267404&semt=ais",
    desc:"xyz"
  },
  {
    name:"abc",
    img:"https://img.freepik.com/free-photo/decorative-reading-concept_23-2147690510.jpg?size=626&ext=jpg&ga=GA1.1.1595312299.1711267404&semt=ais",
    desc:"xyz"
  },
  {
    name:"abc",
    img:"https://img.freepik.com/free-photo/decorative-reading-concept_23-2147690510.jpg?size=626&ext=jpg&ga=GA1.1.1595312299.1711267404&semt=ais",
    desc:"xyz"
  },
  {
    name:"abc",
    img:"https://img.freepik.com/free-photo/decorative-reading-concept_23-2147690510.jpg?size=626&ext=jpg&ga=GA1.1.1595312299.1711267404&semt=ais",
    desc:"xyz"
  },

]
export default Product