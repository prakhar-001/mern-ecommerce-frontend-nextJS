"use client"
import React from 'react'
import AdminLayout from "@/components/Admin-Layout.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useStatsQuery } from '@/redux/api/dashboardAPI';


const page = () => {
  // const { user } = useSelector((state) => state.userReducer);
  // const { isLoading, data, isError, error } = useStatsQuery(user?._id);
  // const stats = data?.stats;


  // if(isError){
  //   toast.error(error.data.message)
  // }

  return (
    <>
      <div className='w-full h-[100vh]'>
      {/* <AdminLayout/> */}
      <AdminLayout>
        <div className='h-screen'>
          Admin Dashboard
        </div>
      </AdminLayout>
      </div>
    </>
    
  )
}

export default page