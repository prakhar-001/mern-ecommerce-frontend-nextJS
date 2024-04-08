"use client"
import AdminLayout from '@/components/Admin-Layout'
import React, { useState } from 'react';
import ProductCardAdmin from "@/components/Product-Card-Admin";
import Link from 'next/link';

import { useAllProductsQuery } from '@/redux/api/productAPI';
import toast from "react-hot-toast";
import { useSelector} from 'react-redux';


const page = () => {
    // Fetching Products
    const {user, loading} = useSelector(state => state.userReducer)
        const {data, isLoading, isError, error} = useAllProductsQuery(user?._id) //this will be used to fetch data from api
        let productsList = data?.products
        // console.log(productsList)
        if(isError){
            toast.error(error.data.message)
        }
    

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page
    // Calculate the total number of pages
    const totalPages = Math.ceil(productsList?.length / itemsPerPage);
    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Slice the data for the current page
    const currentItems = productsList?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
  return (
    <AdminLayout>
        {loading? 
        <div>Loading Products</div>
        :
        <div className="container flex px-2 sm:px-5 flex-col ">
          <div className="flex justify-between items-center font-sans py-2">
            <h1 className="font-semibold text-xl">All Products</h1>
            <div className="sm:flex justify-center mt-4 hidden">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-3 py-1 rounded-md text-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
              </div>
            <Link href={"/admin/newProduct"}><button className='bg-green-400 px-3 py-1 rounded-xl text-sm'>Add Product +</button></Link>
          </div>
          <div className="flex flex-wrap">
            {
              //use data?. and not data.
              currentItems?.map(i => (
                //send key to avoid key error
                <ProductCardAdmin key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock}  photo={i.photo}></ProductCardAdmin>
              ))
            }
          </div>

          {/* Pagination Controls */}
              <div className="flex justify-center mt-4 mb-5">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-3 py-1 text-md rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
              </div>
        </div>
        }
    </AdminLayout>
  )
}

export default page