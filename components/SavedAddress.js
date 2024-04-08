"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import {BiArrowBack} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from '@/redux/reducer/cartReducer';
import { useMyAddressesQuery } from '@/redux/api/addressAPI';


const SavedAddress = ({user}) => {
    // const user = useSelector(state => state.userReducer.user)
    // console.log("USER DATA" + user)
    // console.log(user)

    const {data, isLoading, isError, error} = useMyAddressesQuery(user?._id)
    // console.log(data.addresses)
    if(isError) console.log(error)
 
  return (
    <div>
        {data?.addresses.map(i => (
            <div key={i._id} className='border-2 p-5 h-24 my-2 shadow-xl rounded-xl sm:hover:bg-gray-200'>
                <div>Address: {i.address}, {i.city}, {i.state}, {i.country}, {i.pincode}</div>
            </div>
        ))
        }
    </div>
  )
}

export default SavedAddress