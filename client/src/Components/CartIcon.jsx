import React, { useState } from 'react'
import { MdShoppingCart } from "react-icons/md";
function CartIcon() {
    const [isActive, setIsActive] = useState(false);
    const toggleCart = () => {
        setIsActive(!isActive);
    };
    return (
        <div className="cart-icon">.
            <MdShoppingCart onClick={toggleCart} size={30} className='text-black hover:text-white'/>
            {isActive && (
            <div className="cart-dropdown">
            <p>Your cart is empty</p>
            </div>
        )}
        </div>
    )
}

export default CartIcon