import React from 'react'
import Link from 'next/link'

const ProductCardAdmin = ({productId,photo,name,stock,price}) => {
  return (
    <div className="productCard  h-[18vh] w-full ">
        <div className='h-[17vh] p-1 border-2 shadow-lg rounded-xl sm:hover:bg-slate-300 flex items-center gap-2'>
            <div className='flex items-center justify-center w-1/4 sm:w-1/5'>
                <img src={photo} alt="" className='h-[13vh] sm:h-[13vh] w-auto sm:w-auto px-3 content-center object-contain rounded-2xl' />
            </div>
            <div className='w-2/4 sm:w-3/5'>
              <p>{name}</p>
              <div>₹{price}</div>
              <div>Stock: {stock}</div>
            </div>
            <Link href={`/admin/product/${productId}`} className='w-1/4 sm:w-1/5'><button className='p-1 px-3 ml-1 sm:ml-16 w-20 sm:w-28  bg-blue-400 rounded-xl text-sm'>Manage</button></Link>
        </div>
    </div>
  )
}

export default ProductCardAdmin