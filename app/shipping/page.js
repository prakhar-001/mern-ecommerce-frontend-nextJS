"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import {BiArrowBack} from 'react-icons/bi'
import axios from "axios";
import { useRouter } from 'next/navigation';
import CustomerLayout from "@/components/Customer-Layout.js";
import LoggedInCustomerOnlyLayout from "@/components/Logged-In-Customer-Only-Layout.js";


// Protected Route Imports
import { useDispatch, useSelector } from "react-redux";
import {useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import LoginNow from "@/components/LoginNow.js"
import SavedAddress from "@/components/SavedAddress"
import toast from 'react-hot-toast';
import { saveShippingInfo } from '@/redux/reducer/cartReducer';
import { useNewAddressMutation } from "@/redux/api/addressAPI";
import { useMyAddressesQuery } from '@/redux/api/addressAPI';



const page = () => {

    const {cartItems, total} = useSelector(state => state.
        cartReducer) // fetching item detail from redux
// console.log(cartItems)
// console.log(total)

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const router = useRouter();

    
    // Protected Route
    let sessionStatus;
    const user = useSelector((state) => state.userReducer.user);
    // console.log(user)
    if(user){
      sessionStatus = true;
    }else{
      sessionStatus = false;
    }
    
    const [newAddress] = useNewAddressMutation();
    const {data, isLoading, isError, error} = useMyAddressesQuery(user?._id)
    

    useLayoutEffect(()=> {
        const session = sessionStatus;
        if(!session){
        redirect("/")
        }
    }, []);

    /////////
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });

    const changeHandler = (e) => {
        setShippingInfo((prev) => ({ ... prev,  [e.target.name]: e.target.value}))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        dispatch(saveShippingInfo(shippingInfo));

        const addressData = {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          pincode: shippingInfo.pincode,
          user: user?._id,
        };
        const res = await newAddress(addressData);
        if ("data" in res) {
          toast.success(res.data.message);
        } else {
            const error = res.error;
            const messageResponse = error.data ;
            toast.success(messageResponse.message);
        }

    
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/payment/create`,
            {
              amount: total,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          router.push("/pay",{
              state: data.clientSecret,
          })

        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

    useEffect(()=> {
        if(cartItems.length <= 0) return redirect("/cart")
    }, [cartItems])

    // {sessionStatus? :<LoginNow/>}

    const selectedAddress = (address) => {
      setShippingInfo({
        address: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
     });
      // console.log(address)
    }

    return (
    <>
      <CustomerLayout>
      <LoggedInCustomerOnlyLayout>
        <div className='flex justify-around mx-2 sm:mx-20 flex-col sm:flex-row'>

            <div className='hidden h-10 w-10 fixed top-5 left-5 bg-slate-500 sm:flex items-center justify-center rounded-3xl cursor-pointer'><BiArrowBack/></div>

            {/* New Address Container */}
            <div className='w-11/12 sm:w-2/5'>
                <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                    <h1 className='text-xl font-semibold'>Shipping Address</h1>
                    <input required type="text" placeholder='Address' name='address' value={shippingInfo.address} onChange={changeHandler} className='p-2 border-2 rounded-xl'/>
                    <input required type="text" placeholder='City' name='city' value={shippingInfo.city} onChange={changeHandler} className='p-2 border-2 rounded-xl'/>
                    <input required type="text" placeholder='State' name='state' value={shippingInfo.state} onChange={changeHandler} className='p-2 border-2 rounded-xl'/>

                    <select name="country" id="" required value={shippingInfo.country} onChange={changeHandler} className='p-2 border-2 rounded-xl'>
                        <option value="">Choose a Country</option>
                        <option value="india">India</option>
                    </select>

                    <input required type="number" placeholder='Pincode' name='pincode' value={shippingInfo.pincode} onChange={changeHandler} className='p-2 border-2 rounded-xl'/>

                    <div className="button flex items-center justify-center">
                        <button type='submit' className='w-1/2 bg-green-400 h-10 rounded-xl'>Pay Now</button>
                    </div>
                </form>
            </div>


            {/* Saved Address Container */}
            <div className='w-full sm:w-2/5 mt-5 sm:mt-0'>
                <h1 className='font-semibold text-xl'>Saved Address</h1>
                <div className='w-full'>
                  {data?.addresses.map(i => (
                    <button key={i._id} onClick={() => {selectedAddress(i)}} className='p-5 h-24 my-2 border-2 shadow-xl rounded-xl sm:hover:bg-gray-200 w-full'>
                        <div>Address: {i.address}, {i.city}, {i.state}, {i.country}, {i.pincode}</div>
                    </button>
                    ))
                  }
                </div>
            </div>
        </div>
      </LoggedInCustomerOnlyLayout>
      </CustomerLayout>
    </>
  )
}

export default page