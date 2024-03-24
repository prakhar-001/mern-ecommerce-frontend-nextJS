import React from 'react'


const OrderCardAdmin = ({productId,photo,name,stock,price,handler, quantity}) => {
  
  return (
        <div className='h-[15vh] sm:h-[23vh] border-slate-300 border-2 p-2 rounded-xl hover:bg-slate-300 flex items-center w-full'>
            <div className='flex items-center justify-center w-1/4'>
                <img src={photo} alt="" className='h-[12vh] sm:h-[15vh]  content-center rounded-2xl' />
            </div>
            <div className='ml-5 w-3/4 flex flex-col gap-2'>
              <p>{name}</p>
              <p>₹{price}</p>
              <p>Quantity: {quantity}</p>
            </div>
        </div>
  )
}

export default OrderCardAdmin