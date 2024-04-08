"use client"
import React, { useEffect } from 'react'
import AdminSidebar from "../components/Admin-Sidebar.js";
import CustomerLayout from "@/components/Customer-Layout.js";


// Protected Route Imports
import { useSelector } from "react-redux";
import {useLayoutEffect } from "react";
import { redirect } from "next/navigation";



const AdminLayout = ({children}) => {

    // Protected Route
    let sessionStatus = true;
    const userData = useSelector((state) => state.userReducer.user);
    
      // if(userData?.role === "admin"){
      //   sessionStatus = true;
      // }else{
      //   sessionStatus = false;
      // }
    
    useLayoutEffect(()=> {
        const session = sessionStatus;
        if(!session){
        redirect("/")
        }
    }, []);

    // {sessionStatus?:<div className='border-4 w-1/4 mx-auto rounded-xl p-5'><h1>You Are Not Admin</h1></div>}

  return (
    <> 
    <CustomerLayout>
      <div className='flex flex-col sm:flex-row w-full'>
        <div className='w-full sm:w-1/5 h-[8vh] sm:h-full'>
          <div className='mx-1 sm:mx-0 bg-blue-200 rounded-xl h-full shadow-lg'>
            <AdminSidebar/>
          </div>
        </div>
        <div className='w-full sm:w-4/5 bg-blue-00 h-auto'>
            {children}
        </div>
      </div>
    </CustomerLayout>
    </>    
  )
}

export default AdminLayout