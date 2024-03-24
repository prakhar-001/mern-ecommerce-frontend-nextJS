"use client"
import AdminLayout from '@/components/Admin-Layout'
import React, { useEffect } from 'react'
import ProductCardAdmin from "@/components/Product-Card-Admin";
import Link from 'next/link';

import { useAllProductsQuery } from '@/redux/api/productAPI';
import toast from "react-hot-toast";
import { useSelector} from 'react-redux';


const page = () => {
    // Fetching Products
    const {user, loading} = useSelector(state => state.userReducer)
        const {data, isLoading, isError, error} = useAllProductsQuery(user?._id) //this will be used to fetch data from api
        if(isError){
            toast.error(error.data.message)
        }
    
    
  return (
    <AdminLayout>
        {loading? 
        <div>Loading Products</div>
        :
        <div className="container flex px-2 sm:px-5 flex-col ">
          <div className="flex justify-between items-center font-sans text-xl py-2">
            <h1 className="font-semibold">All Products</h1>
            <Link href={"/admin/newProduct"}><button className='bg-green-400 px-3 py-1 rounded-xl text-sm'>Add Product +</button></Link>
          </div>
          <div className="flex flex-wrap">
            {
              //use data?. and not data.
              data?.products.map(i => (
                //send key to avoid key error
                <ProductCardAdmin key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock}  photo={i.photo}></ProductCardAdmin>
              ))
            }
          </div>
        </div>
        }
    </AdminLayout>
  )
}

export default page