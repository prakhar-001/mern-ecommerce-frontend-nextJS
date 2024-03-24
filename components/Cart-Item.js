import React from 'react'
import Link from 'next/link';
import { FaTrash } from "react-icons/fa";


const CartItem = ({cartItem, incrementHandler, decrementHandler, removeHandler}) => {

    const {photo,productId,name,price,quantity} = cartItem;
    // console.log(photo)
  return (
    <div className="cart-item flex justify-between items-center shadow-lg shadow-slate-200 p-2 rounded-xl my-2 h-[11vh] sm:h-[18vh]">
        <div className="w-5/6 flex items-center ">
            <div className='w-1/3 sm:w-1/5 '>
                <img src={photo} alt={name} className='h-[8vh] w-auto sm:h-[15vh] mx-auto sm:ml-5'/>
            </div>
            <article className='pl-4 sm:pl-16 flex flex-col gap-2 w-3/4 sm:w-4/5'>
                <Link href={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>
        </div>
        <div className="w-1/6 flex flex-col sm:flex-row items-center gap-5 mr-5">
            <div className="flex flex-row items-center gap-2 sm:gap-5">
                <button onClick={() => decrementHandler(cartItem)} className='bg-slate-300 sm:hover:bg-red-300 h-6 sm:h-8 w-6 sm:w-8 rounded-lg'>-</button>
                <p>{quantity}</p>
                <button onClick={() => incrementHandler(cartItem)} className='bg-slate-300 sm:hover:bg-green-300 h-6 sm:h-8 w-6 sm:w-8 rounded-lg '>+</button>
            </div>
            <button onClick={() => removeHandler(productId)} className='sm:hover:text-red-500 hover:text-xl'><FaTrash/></button>
        </div>
    </div>
  )
}

export default CartItem