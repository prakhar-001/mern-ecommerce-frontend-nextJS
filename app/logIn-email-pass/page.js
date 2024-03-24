"use client"
import React, { useState } from 'react'
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/firebase.js";
import toast from "react-hot-toast";
import Link from 'next/link';

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
            
        signInWithEmailAndPassword(auth, email, password).then((userExist) => {
            toast.success("Existing User Logged In Successfully")
        }).catch((err) => {
            toast.error(err.code)
        })
}

  return (
    <div className='flex items-center flex-col justify-center mt-5 sm:mt-10 mx-auto bg-slate-300 rounded-xl w-11/12 sm:w-1/2  p-5'>
        <h1 className='text-xl font-semibold'>Login Now</h1>
        <form action="" onSubmit={submitHandler} className='w-5/6 sm:w-9/12 flex flex-col gap-5 items-center mb-5'>
            
            <div className='w-full'> 
                <label htmlFor="gender" className='my-2'>Email</label>
                <input 
                type="email " 
                placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 border-2 rounded-xl w-full'
                />
            </div>
            <div className='w-full'>
                <label htmlFor="gender" className='my-2'>Password</label>
                <input 
                type="number" 
                placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className='p-2 border-2 rounded-xl w-full'/>
            </div>
            
            <button type='submit' className='bg-green-300 p-2 rounded-xl w-32 hover:bg-green-400'>Log In</button>
        </form>
        <div className='flex gap-5'> 
            <div><button className='p-2 w-32 mb-1 bg-green-300 hover:bg-green-400 rounded-xl'><Link href={"/signIn-email-pass"}>Sign Up</Link></button></div>
            <div><button className='p-2 w-32 bg-green-300 hover:bg-green-400 rounded-xl'><Link href={"/"}>Buy Now!</Link></button></div>
        </div>
    </div>
  )
}

export default page