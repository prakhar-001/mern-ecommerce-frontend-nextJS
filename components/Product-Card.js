import React from 'react'
import { FaPlus} from "react-icons/fa";


const ProductCard = ({productId,photo,name,stock,price,handler}) => {
  
  return (
    <div className="productCard p-1 h-[30vh] sm:h-[50vh] w-1/2 sm:w-1/4 ">
        <div className='h-[29vh] sm:h-[49vh] p-2 shadow-lg shadow-slate-200 rounded-xl sm:hover:bg-slate-200 flex flex-col justify-between'>
            <div className='flex items-center justify-center '>
                <img src={photo} alt="" className='h-[15vh] w-auto sm:h-[30vh] p-2 content-center rounded-2xl' />
            </div>
            <p>{name}</p>
            <div className='flex items-center justify-between pt-2'>
              <span>₹{price}</span>
              <div className="mr-1">
                  <button onClick={() => handler({productId, price, name, photo, stock, quantity: 1})} className='p-2 sm:p-3 rounded-full bg-green-300'><FaPlus/></button>
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default ProductCard