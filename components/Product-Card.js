"use client"
import React from 'react'
import { FaPlus} from "react-icons/fa";
import Link from 'next/link';

import { useSelector } from "react-redux";
import toast from "react-hot-toast";


    


const ProductCard = ({productId,photo,name,stock,price,handler, description}) => {

  let sessionStatus;
    const abc = useSelector((state) => state.userReducer.user);
    if (abc) {
        // console.log(abc.role)
        sessionStatus = true;
    } else {
        sessionStatus = false;
    }
  
  return (
    <div className="productCard p-1 h-[30vh] sm:h-[50vh] w-1/2 sm:w-1/4 ">
        <div className='h-[29vh] sm:h-[49vh] p-2 shadow-lg shadow-slate-200 rounded-xl sm:hover:bg-slate-200 flex flex-col justify-between'>
            <Link href={`/product/${productId}`}>
              <div className='flex items-center justify-center '>
                <img src={photo} alt="" className='h-[15vh] w-auto sm:h-[30vh] p-2 content-center object-contain rounded-2xl' />
              </div>
            </Link>
            <p>{name}</p>
            <div className='flex items-center justify-between pt-2'>
              <span>₹{price}</span>
              {
                sessionStatus?
                <div className="mr-1">
                  <button onClick={() => handler({productId, price, name, photo, stock, quantity: 1, description})} className='p-2 sm:p-3 rounded-full bg-green-300'><FaPlus/></button>
                </div>
                :
                <div className="mr-1">
                  <button onClick={() => toast.error("Login to Add Item in your Cart")} className='p-2 sm:p-3 rounded-full bg-red-400' ><FaPlus/></button>
                </div>
                }
            </div>
            
        </div>
    </div>
  )
}

export default ProductCard