"use client"
import AdminLayout from '@/components/Admin-Layout'
import React from 'react'
import { useSelector} from 'react-redux';
import {useAllOrdersQuery} from "../../../redux/api/orderAPI.js"
import toast from "react-hot-toast";
import TransactionCard from "@/components/Transaction-Card.js"
import CustomerLayout from "@/components/Customer-Layout.js";
import Link from 'next/link.js';


const page = () => {
  const {user, loading} = useSelector(state => state.userReducer)

  const {data, isLoading, isError, error} = useAllOrdersQuery(user?._id)
  const items = data?.orders;
  // console.log(items)

  if(isError){
    toast.error(error.data.message)
  }
  return (
    <AdminLayout>
      <div >
        <h1 className='px-auto font-semibold pl-2 sm:pl-5 py-2 '>All Transactions</h1>
        <div className='px-2 sm:px-5 pb-2 border-b-2'>
          <ul className='flex text-sm sm:text-base'>
            <li className='w-1/4 sm:w-1/6'>Customer</li>
            <li className='w-1/4 sm:w-1/6 pl-1'>Amount</li>
            <li className='w-1/4 sm:w-1/6 hidden sm:block'>Discount</li>
            <li className='w-1/4 sm:w-1/6 hidden sm:block'>Quantity</li>
            <li className='w-1/4 sm:w-1/6 pl-4'>Status</li>
            <li className='w-1/4 sm:w-1/6 pl-5'>Action</li>
            {/* <div><button>Manage</button></div> */}
          </ul>
        </div>
        <div className='flex flex-col px-1  sm:px-3'>
        {
          items?.map(i => (            
            <TransactionCard 
            key={i._id} 
            productID={i._id}
            total={i.total} 
            subtotal={i.subtotal} 
            orderitems={i.orderItems} 
            discount={i.discount} 
            username={i.user?.name}
            status={i.status}
            />
            ))
          }
        </div>
      </div>
    </AdminLayout>
  )
}

export default page