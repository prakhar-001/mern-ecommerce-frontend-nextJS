"use client"
import React, { useState } from 'react';
import { useMyAddressesQuery, useDeleteAddressMutation, useUpdateAddressMutation } from '@/redux/api/addressAPI';
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaSave } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

import toast from 'react-hot-toast';

import CustomerLayout from "@/components/Customer-Layout.js";
import LoggedInCustomerOnlyLayout from "@/components/Logged-In-Customer-Only-Layout.js";


const page = () => {
    const user = useSelector((state) => state.userReducer.user);

    const {data, isLoading, isError, error} = useMyAddressesQuery(user?._id)


    const [updateAddress] = useUpdateAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();
    // const [selectedAddress, setSelectedAddress] = useState({
    //     address: "",
    //     city: "",
    //     state: "",
    //     country: "",
    //     pincode: "",
    // });

    const [addressID, setAddressID] = useState("");
    const [addressUpdate, setAddressUpdate] = useState("");
    const [cityUpdate, setCityUpdate] = useState("");
    const [stateUpdate, setStateUpdate] = useState("");
    const [countryUpdate, setCountryUpdate] = useState("");
    const [pincodeUpdate, setPincodeUpdate] = useState("");

    const deleteHandler = async (address) => {
        const res = await deleteAddress({
          addressId: address?._id,
        });
        if ("data" in res) {
            toast.success(res.data.message);
        } else {
            const error = res.error;
            const messageResponse = error.data ;
            toast.error(messageResponse.message);
        }
      };



      const handleEdit = (address) => {
        // console.log(address._id + "edit")
        setAddressID(address._id)
        setAddressUpdate(address.address)
        setCityUpdate(address.city)
        setStateUpdate(address.state)
        setCountryUpdate(address.country)
        setPincodeUpdate(address.pincode)
        };

      const handleUpdate = async (address) => {
        const formData = new FormData();
        if (addressUpdate) formData.set("address", addressUpdate);
        if (cityUpdate) formData.set("city", cityUpdate);
        if (stateUpdate) formData.set("state", stateUpdate);
        if (countryUpdate) formData.set("country", countryUpdate);
        if (pincodeUpdate) formData.set("pincode", pincodeUpdate);

        const res = await updateAddress({
            formData,
            addressId: addressID,
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
        <LoggedInCustomerOnlyLayout>

            <div>Profile Page</div>

            {/* ADDRESS CONTAINER */}
            <div className='flex justify-between mx-2 sm:mx-20 flex-col sm:flex-row gap-5'>
                {/* Saved Address Container */}
                <div className='w-full sm:w-3/5 mt-5 sm:mt-0'>
                    <h1 className='font-semibold text-xl'>Saved Address</h1>
                    <div className='w-full'>
                    {data?.addresses.map(i => (
                        <div key={i._id} className='p-5 h-28 my-2 border-2 shadow-xl rounded-xl sm:hover:bg-gray-200 w-full flex items-center justify-between'>
                            <div className='w-full'>Address: {i.address}, {i.city}, {i.state}, {i.country}, {i.pincode}</div>
                            <div className='flex flex-col sm:flex-row gap-5 w-20 justify-between items-center'>
                                <button onClick={() => {handleEdit(i)}} className=' flex items-center gap-2 text-lg hover:text-red-500 sm:hover:text-3xl'><MdModeEdit/></button>
                                <button onClick={() => {deleteHandler(i)}} className='hover:text-red-500 sm:hover:text-2xl'><FaTrash /></button>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>

                {/* Edit Address Form */}
                    {
                    data?
                    <div className='mt-0 sm:mt-9 w-full sm:w-2/5 border-2 shadow-xl p-5 rounded-xl mb-10'>
                        <h2 className='font-semibold text-lg'>Edit Address</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className='w-full items-center flex flex-col'>
                            <input type="text" placeholder="Address" value={addressUpdate} onChange={(e) => setAddressUpdate(e.target.value)} className='border-2 w-full my-1 p-2'/>
                            <input type="text" placeholder="City" value={cityUpdate} onChange={(e) => setCityUpdate(e.target.value)} className='border-2 w-full my-1 p-2'/>
                            <input type="text" placeholder="State" value={stateUpdate} onChange={(e) => setStateUpdate(e.target.value)} className='border-2 w-full my-1 p-2'/>
                            {/* <input type="text" placeholder="Country" value={countryUpdate} onChange={(e) => setCountryUpdate(e.target.value)} className='border-2 w-full my-1 p-2'/> */}
                            <input type="text" placeholder="Pincode" value={pincodeUpdate} onChange={(e) => setPincodeUpdate(e.target.value)} className='border-2 w-full my-1 p-2'/>
                            {
                                addressID?
                                <button type="submit" className='bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded w-32 flex items-center justify-center gap-2'>
                                <p>Update</p><FaSave /></button>
                                :
                                <div onClick={() => toast.error("Select Address to Update")} className='bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded w-32 flex items-center justify-center gap-2'>
                                <p>Update</p><FaSave /></div>
                            }
                            
                        </form>
                    </div>
                    :
                    <div>Add Address to deliver your Orders</div>
                    }
            </div>
        </LoggedInCustomerOnlyLayout>
    </CustomerLayout>
  )
}

export default page