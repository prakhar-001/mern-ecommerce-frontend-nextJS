"use client"
import React from 'react'
import { useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import toast from "react-hot-toast";
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from "@/firebase.js";
import { useLoginMutation } from '@/redux/api/userApi';
import Link from 'next/link';


// Protected Route Imports
import { useSelector } from "react-redux";
import {useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import LoginNow from "@/components/LoginNow.js"

const page = () => {
    // Protected Route
    // let sessionStatus;
    // const abc = useSelector((state) => state.userReducer.user);
    // if(abc){
    //   sessionStatus = true;
    // }else{
    //   sessionStatus = false;
    // }
    // // console.log(sessionStatus)
    // useLayoutEffect(()=> {
    //   const session = sessionStatus;
    //   if(session === true){
    //     redirect("/")
    //   }
    // }, [sessionStatus]);

    ///////////////
    const [gender, setGender] = useState('')
    const [date, setDate] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()

    const loginHandler = async() => {
        try {
            const provider = new GoogleAuthProvider()
            // POP UP
            const {user} = await signInWithPopup(auth, provider)
            console.log(user)

            // REDIRECT
            // const user = await signInWithRedirect(auth, provider)
            // const userCred = await getRedirectResult(auth);
            // console.log("User data from Redirect")
            // console.log(userCred)

            const res = await login({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                gender,
                role:"user",
                dob: date,
                _id: user.uid
            });

            if("data" in res){
                toast.success(res.data.message)
            }else{
                const error = res.error;
                const message = error.data.message;
                // toast.error("ye error de rha hai")
                toast.error(message)
                // console.log(message)
            }

            // toast.success("Login In Successfull")
        } catch (error) {
            toast.error("Sign In Fail Login Page")
        }
    };
    
  return (
    <>

    <div>
        <div className='border-4 w-1/4 mx-auto rounded-xl p-5'>
            <h1 className="heading text-center text-xl mb-10">Login</h1>
            <div className=' flex flex-col my-5'>
                <label htmlFor="gender" className='my-2'>Gender</label>
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className='p-2 border-2 rounded-xl w-full'>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className='flex flex-col my-5'>
                <label htmlFor="" className='my-2'>Date of birth</label>
                <div className='p-2 border-2 rounded-xl w-full flex items-center justify-center'><input type="date" value={date} onChange={(e) => setDate(e.target.value) } /></div>
            </div>
            <div className='flex flex-col my-5'>
                <label htmlFor="" className='my-2'>Password</label>
                <div className='p-2 border-2 rounded-xl w-full flex items-center justify-center'><input type="text" value={password} onChange={(e) => setPassword(e.target.value) } /></div>
            </div>
            <div className='flex flex-col items-center'>
                <p>Already Signed in Once</p>
                <button onClick={loginHandler} className='border-2 flex h-10 items-center my-5'>
                    <span className='text-2xl pl-2 w-10'><FcGoogle/></span>
                    <span className='p-2 bg-blue-500'>Sign in with Google</span>
                </button>
            </div>
            <div ><Link href={"/"} className='bg-green-300 w-40 p-3'>Buy Now!</Link></div>
        </div>
    </div>

    </>
  )
}

export default page