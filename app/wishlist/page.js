"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaSave } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

import toast from 'react-hot-toast';

import CustomerLayout from "@/components/Customer-Layout.js";
import LoggedInCustomerOnlyLayout from "@/components/Logged-In-Customer-Only-Layout.js";
import Link from 'next/link';
import {useMyWishlistQuery, useDeleteItemWishlistMutation} from "@/redux/api/wishlistAPI.js"

const page = () => {
    const user = useSelector((state) => state.userReducer.user);
    // console.log(user?._id)

    
    // const {data, error, isLoading, isError} = useMyWishlistQuery(user?._id, currentPage, itemsPerPage)
    const {data, error, isLoading, isError} = useMyWishlistQuery(user?._id)
    let wishlistItems = data?.wishlist
    console.log(wishlistItems)


    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Calculate the total number of pages
    const totalPages = Math.ceil(wishlistItems?.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Slice the data for the current page
    const currentItems = wishlistItems?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    // Delete Handler
    const [deleteItem] = useDeleteItemWishlistMutation();
    const deleteHandler = async (itemId) => {
        // console.log(itemId)
        const res = await deleteItem({
          itemId,
        });
        if ("data" in res) {
            toast.success(res.data.message);
        } else {
            const error = res.error;
            const messageResponse = error.data ;
            toast.error(messageResponse.message);
        }
      };

    

  

  return (
    <CustomerLayout>
        {/* <LoggedInCustomerOnlyLayout> */}

            {/*  CONTAINER */}
            <div className='mx-2 sm:mx-20'>
                <h1 className='text-xl font-semibold pl-2'>Your Wishlist</h1>
            <div className='flex flex-row flex-wrap w-full'>
                
                {
                    currentItems?.map(i => (
                        <div key={i._id} className='w-1/2 sm:w-1/5 h-[30vh] sm:h-[37vh] '>
                            <div className='h-[29vh] sm:h-[35vh] p-2 shadow-lg shadow-slate-200 rounded-xl sm:hover:bg-slate-200 flex flex-col justify-between m-2'>
                                <Link href={`/product/${i.wishlistItem.productId}`}>
                                    <div className='flex items-center justify-center '>
                                        <img src={i.wishlistItem?.photo} alt="" className='h-[15vh] w-auto sm:h-[20vh] p-2 content-center object-contain rounded-2xl' />
                                    </div>  
                                </Link>
                                <p>{i.wishlistItem.name}</p>
                                
                                <div className='flex justify-between'>
                                    <p>₹{i.wishlistItem?.price}</p>
                                    <button className="product-delete-btn hover:text-red-500 sm:hover:text-xl" onClick={() => deleteHandler(i._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))
                }

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-3 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
            </div>
            </div>
        {/* </LoggedInCustomerOnlyLayout> */}
    </CustomerLayout>
  )
}

export default page