"use client"
import AdminLayout from '@/components/Admin-Layout'
import React from 'react'
import {useAllUsersQuery, useDeleteUserMutation} from "@/redux/api/userApi.js"
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";


const page = () => {
  const {user, loading} = useSelector(state => state.userReducer)
  const {data, isLoading, isError, error} = useAllUsersQuery(user?._id)

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    const res = await deleteUser({ userId, adminUserId: user?._id});
    // responseToast(res, null, "");
    if ("data" in res) {
      toast.success(res.data.message);
    } else {
      const error = res.error;
      const messageResponse = error.data ;
      toast.error(messageResponse.message);
    }
  };


  if(isError){
    toast.error(error.data.message)
  }

  return (
    <AdminLayout>
      <div className='flex justify-between mx-2 sm:mx-5'>
        <div className='hidden sm:block'>Avatar</div>
        <div className='sm:mr-[8vw]'>Name</div>
        <div className='hidden sm:block sm:mr-[7vw]'>Gender</div>
        <div className='sm:ml-[1vw]'>Email</div>
        <div className='mr-12 sm:ml-[12vw]'>Role</div>
        <div className='hidden sm:block sm:mr-[4vw]'>Action</div>
      </div>
      <div>
        {
          data?.users.map(i => (
            <div className='flex w-full items-center justify-between px-2 flex-wrap h-[8vh] sm:h-[12vh] ' key={i._id}>
              <div className='w-1/12 hidden sm:block'>
                <img src={i.photo} alt="Profile" className='rounded-full h-10 sm:h-16 w-10 sm:w-16 '/>
              </div>
              <div className='w-2/12'>{i.name}</div>
              <div className='w-1/12 hidden sm:block'>{i.gender}</div>
              <div className='w-6/12 overflow-x-auto'>{i.email}</div>
              <div className='w-1/12'>{i.role}</div>
              <button onClick={() => deleteHandler(i._id)} className='w-1/12'><FaTrash /></button>
            </div>
          ))
        }
      </div>
    </AdminLayout>
  )
}

export default page