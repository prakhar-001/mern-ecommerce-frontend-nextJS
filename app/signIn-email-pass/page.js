"use client"
import React, { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/firebase.js";
import toast from "react-hot-toast";
import Link from 'next/link';
import { FaShoppingBag} from "react-icons/fa";

import { useLoginMutation } from "../../redux/api/userApi";
import NotLoggedInCustomerOnlyLayout from "@/components/Not-Logged-In-Customer-Only-Layout.js"
import CustomerLayout from "@/components/Customer-Layout.js";

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

    let enableButton = false;
    const [userValue, setUserValue] = useState(false)

    if(name && email && gender && date && password) enableButton=true;
    // console.log(enableButton)

    const submitHandler = async (e) => {
        let userDetail;
        e.preventDefault();
        try {
            const {newUser} = createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                signInWithEmailAndPassword(auth, email, password).then(
                    userDetail = auth.currentUser,
                    // console.log(auth.currentUser),
                    
                    
                    // console.log("user Created"),
                    toast.success("User Created"),
                );
                // console.log(userDetail)
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
                setUserValue(true)
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
    // <CustomerLayout>
    // <NotLoggedInCustomerOnlyLayout>
        <div className='flex items-center flex-col justify-center mt-5 sm:mt-10 mx-auto border-2 shadow-2xl mb-20 rounded-xl w-11/12 sm:w-2/5  p-5'>
            <h1 className='text-xl font-semibold'>Create Account</h1>
            <form action="" onSubmit={submitHandler} className='w-5/6 sm:w-9/12 flex flex-col gap-5 items-center mb-8'>
                
                
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
                    type="password" 
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
                {
                    enableButton? 
                    <button type='submit' className='p-2 border-2 rounded-xl w-32 hover:shadow-green-300 shadow-xl'>Sign Up</button>
                    :
                    <div className='p-2 px-5 border-2 rounded-xl w-auto hover:shadow-red-400 shadow-xl'>Sign Up</div>
                }
            </form>
            <div className='flex gap-5'> 
                <div><button className='p-2 w-32 mb-1 border-2 hover:shadow-slate-400 rounded-xl shadow-xl '><Link href={"/logIn-email-pass"}>Log In</Link></button></div>
                {
                    userValue?
                    <div><button className='p-2 w-32 border-2 hover:shadow-green-300 rounded-xl shadow-xl'><Link href={"/"} className='flex items-center justify-center gap-2'><p>Buy Now! </p><FaShoppingBag /></Link></button></div>
                    :
                    <div><button className='p-2 w-32 border-2 hover:shadow-red-400 shadow-xl rounded-xl' ><Link href={"/"} className='flex items-center justify-center gap-2'><p>Buy Now! </p><FaShoppingBag /></Link></button></div>
                }
            </div>
        </div>
    // </NotLoggedInCustomerOnlyLayout>
    // </CustomerLayout>
  )
}

export default page