"use client"
import React, { ReactElement } from 'react'
import OrderCard from "@/components/Order-Card.js"
import CustomerLayout from "@/components/Customer-Layout.js";
import LoggedInCustomerOnlyLayout from "@/components/Logged-In-Customer-Only-Layout.js";



// Protected Route Imports
import { useSelector } from "react-redux";
import {useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import LoginNow from "@/components/LoginNow.js"
import { useMyOrdersQuery } from '@/redux/api/orderAPI';
import toast from 'react-hot-toast';



const page = () => {

  const {user, loading} = useSelector(state => state.userReducer)

  const {data, isLoading, isError, error} = useMyOrdersQuery(user?._id)
  const items = data?.orders;
  console.log(items)

  if(isError){
    toast.error(error.data.message)
  }
    
  return (
    <>
      <CustomerLayout>
        <LoggedInCustomerOnlyLayout>
          <div className='p-2 sm:p-5'>
              <h1 className='text-lg font-semibold py-2'>My Orders</h1>
              <div className='px-2 sm:px-5 pb-2 border-b-2'>
                <div className='flex text-sm sm:text-base'>
                  <div className='w-1/5 text-sm sm:text-base sm:pl-16'>Product</div>
                  <div className='w-1/5'>Amount</div>
                  <div className='w-1/5'>Discount</div>
                  <div className='w-1/5'>Quantity</div>
                  <div className='w-1/5 pl-4 sm:pl-12'>Status</div>
                </div>
              </div>  
            {
              items?.map(i => (
                
                <div key={i._id} className='flex flex-col px-1 sm:px-3'>
                  <OrderCard  
                    productID={i._id}
                    total={i.total} 
                    subtotal={i.subtotal} 
                    orderitems={i.orderItems} 
                    discount={i.discount} 
                    username={i.user.name}
                    status={i.status}
                    />
                    </div>
              ))
            }
          </div>
        </LoggedInCustomerOnlyLayout>
      </CustomerLayout>
    </>
  )
}

export default page