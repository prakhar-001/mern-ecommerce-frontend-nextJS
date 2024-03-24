import React from 'react'
import Link from 'next/link'
const TransactionCard = ({ productID, total, subtotal, orderitems, username, discount,status}) => {
    // console.log(orderitems)
  return (
    <div className='flex border-b-2 my-1 px-2 py-3 text-sm sm:text-base'>
        <div className='w-1/4 sm:w-1/6'>{username}</div>
        <div className='w-1/4 sm:w-1/6 pl-2'>{total}</div>
        <div className='w-1/4 sm:w-1/6 pl-2 hidden sm:block sm:pl-5'>{discount}</div>
        <div className='w-1/4 sm:w-1/6 pl-3 hidden sm:block'>Q-{orderitems[0].quantity}</div>
        <div className='w-1/4 sm:w-1/6 flex justify-center sm:justify-start'>{status}</div>
        <div className='w-1/4 sm:w-1/6 pl-4'>
            <button className='bg-blue-400 rounded-lg text-sm p-2 py-1'><Link href={`/admin/transaction/${productID}`}>Manage</Link></button>
        </div>
            {/* <div>{
                orderitems?.map(i => (
                    <div key={i._id}>{i.name}</div>
                ))
            }</div> */}
    </div>
  )
}

export default TransactionCard