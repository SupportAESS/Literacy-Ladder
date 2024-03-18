import React from 'react'

function Product() {
    const data = [
        {
            name: `Product 1`,
            img: `https://cdn.pixabay.com/photo/2016/03/27/19/32/book-1283865_960_720.jpg`,
            Author: `XYZ`
        },
        {
            name: `Product 1`,
            img: `https://cdn.pixabay.com/photo/2016/03/27/19/32/book-1283865_960_720.jpg`,
            Author: `XYZ`
        },
        {
            name: `Product 1`,
            img: `https://cdn.pixabay.com/photo/2016/03/27/19/32/book-1283865_960_720.jpg`,
            Author: `XYZ`
        },
        {
            name: `Product 1`,
            img: `https://cdn.pixabay.com/photo/2016/03/27/19/32/book-1283865_960_720.jpg`,
            Author: `XYZ`
        },

    ];
  return (
    <div className='relative flex items-center'>
        <div className='w-full h-full overflow-x-scroll scroll whitespace-nowrap'>
            {
                data.map((d) => (
                    <div className='inline-block'>
                        <img className = "w-[220px] cursor-pointer hover:scale-105 ease-in-out duration-300" src = {d.img} alt = "/"/>
                        <p className='text-center'>{d.name}</p>
                        <p className='text-center'>{d.Author}</p>
                        <button className='text-center bg-blue-900 text-white hover:bg-blue-500'>Add to Cart</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Product