"use client"
import React from 'react'
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


const LoggedInCustomerOnlyLayout = ({children}) => {

    let sessionStatus;
    const abc = useSelector((state) => state.userReducer.user);
    if (abc) {
        // console.log(abc.role)
        sessionStatus = true;
    } else {
        sessionStatus = false;
    }
    useLayoutEffect(() => {
        const session = sessionStatus;
        if (!session) {
        redirect("/signIn-email-pass")
        }
    }, []);
    return (
        // <div className='text-5xl font-semibold mx-auto'>Login To Access This Page</div>
        <div>{children}</div>
    )
}

export default LoggedInCustomerOnlyLayout