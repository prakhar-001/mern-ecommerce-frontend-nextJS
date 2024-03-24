"use client"
import React, { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/firebase.js";
import toast from "react-hot-toast";
import Link from 'next/link';

import { useLoginMutation } from "../../redux/api/userApi";

// import { getAuth } from 'firebase/auth';

const page = () => {
    // const auth = getAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg");
    const [gender, setGender] = useState("");
    // const [role, setRole] = useState("user");
    const [date, setDate] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useLoginMutation()

    const submitHandler = async (e) => {
        let userDetail;
        e.preventDefault();
        try {
            const {newUser} = createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                signInWithEmailAndPassword(auth, email, password).then(
                    userDetail = auth.currentUser,
                    console.log(auth.currentUser),
                    
                    
                    console.log("user Created"),
                    toast.success("User Created"),
                );
                console.log(userDetail)
                login({
                    name: name,
                    email: userDetail.email,
                    password: password,
                    photo: photo,
                    gender: gender,
                    role:"user",
                    dob: date,
                    _id: userDetail.uid
                });
              })
              .catch((err) => {
                toast.error("User Not Created")
                toast.error(err.code)
            });
            console.log(userDetail)

        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='flex items-center flex-col justify-center mt-5 sm:mt-10 mx-auto bg-slate-300 rounded-xl w-11/12 sm:w-1/2  p-5'>
        <h1 className='text-xl font-semibold'>Create Account</h1>
        <form action="" onSubmit={submitHandler} className='w-5/6 sm:w-9/12 flex flex-col gap-5 items-center mb-5'>
            
            
            <div className='w-full'> 
                <label htmlFor="gender" className='my-2'>Name</label>
                <input 
                type="name " 
                placeholder='Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className='p-2 border-2 rounded-xl w-full'
                />
            </div>
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
                className='p-2 border-2 rounded-xl w-full'
            />
            </div>
            
            <div className='w-full'>
                <label htmlFor="gender" className='my-2'>Gender</label>
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className='p-2 border-2 rounded-xl w-full'>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor="" className='my-2'>Date of birth</label>
                <div className='p-2 border-2 rounded-xl w-full flex items-center justify-center'><input type="date" value={date} onChange={(e) => setDate(e.target.value) } className='w-full flex items-center justify-center' /></div>
            </div>
            <button type='submit' className='bg-green-300 p-2 rounded-xl w-32 hover:bg-green-400'>Sign Up</button>
        </form>
        <div className='flex gap-5'> 
            <div><button className='p-2 w-32 mb-1 bg-green-300 hover:bg-green-400 rounded-xl'><Link href={"/logIn-email-pass"}>Log In</Link></button></div>
            <div><button className='p-2 w-32 bg-green-300 hover:bg-green-400 rounded-xl'><Link href={"/"}>Buy Now!</Link></button></div>
        </div>
    </div>
  )
}

export default page