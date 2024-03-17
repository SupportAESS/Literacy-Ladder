import React from 'react'
import logo from '../asset/logo.png'
import {HiSearch} from 'react-icons/hi'
import CartIcon from './CartIcon'
function Home() {
  return (
    <>
      <nav className='mx-auto flex flex-row bg-slate-500'>
        <a href="/" className=''>
          <img src = {logo} className='w-20'></img>
        </a>
        <h1 className='self-center mx-auto text-white text-3xl font-bold'>Literacy Ladder</h1>
        <input type="text" placeholder="Search..." className="self-center h-10 
        w-90 border rounded-l-full border-gray focus:outline-none focus:border-blue-600"/>
        <button className="flex-initial self-center bg-blue-300 h-10 px-3 py-2 border rounded-r-full 
        border-b-gray hover:bg-blue-600 hover:text-white">
          <HiSearch size={20}/>
        </button>
        <div className='flex flex-row -mx-0'>
          <a href = "/" className='self-center px-5 text-xl font-medium text-slate-950 hover:font-bold
          hover:text-white'>Home</a>
          <a href = "/" className='self-center pr-5 text-xl font-medium text-slate-950 hover:font-bold
          hover:text-white'>Account</a>
          <a href = "/" className='self-center pr-5 text-xl font-medium text-slate-950 hover:font-bold
          hover:text-white'>About Us</a>
          <div className=''>
            <CartIcon/>
          </div>
        </div>
        
      </nav>

    </>
  )
}

export default Home