import React from 'react'
import Link from 'next/link'
const OrderCard = ({productID, total, orderitems, discount,status}) => {
  // console.log(orderitems)
  return (
    <div className='flex border-b-2 my-1 px-2 py-3 text-sm sm:text-base'>  
        <div className='w-1/5 flex flex-col items-center'>
          {
            orderitems.map((i, index) => (
              <img key={i._id} src={i.photo} alt="" className='h-14 w-auto my-2'/>
            ))
          }
        </div>
        <div className='w-1/5 pl-2'>{total}</div>
        <div className='w-1/5 pl-6'>{discount}</div>
        <div className='w-1/5'>
          {
            orderitems.map((i, index) => (
              <div  key={i._id}>{i.name}-{i.quantity}</div>          
            ))
          }
        </div>
        <div className='w-1/5 sm:pl-10'>{status}</div>
        {/* <div className='w-1/6 pl-4'>
            <button className='bg-blue-400 rounded-lg text-sm p-2 py-1'>Manage</button>
        </div> */}

    </div>
  )
}

export default OrderCard