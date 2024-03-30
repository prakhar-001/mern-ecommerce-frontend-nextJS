"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import Link from 'next/link'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { userExist, userNotExist } from '@/redux/reducer/userReducer';
import { getUserData } from '@/redux/api/userApi';
import toast from 'react-hot-toast';
import { TiHome } from "react-icons/ti";



const user = {_id : "", role : ''};

const Header = () => {

    // this will help us to open and close dialog tag
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch();
    const {user, loading} = useSelector((state) => state.userReducer)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          // console.log(user)
          if(user){
            // console.log("Yaha error aarha hai header mai")
            const data = await getUserData(user.uid)
            // console.log("Logged In Header")

            dispatch(userExist(data.user))
          }else{
            // console.log("Not Logged in Header")
            dispatch(userNotExist());
          }
        })
      }, [])

    const logoutHandler = async () => {
      try {
        await signOut(auth);
        toast.success("Logged Out Successfully")
        setIsOpen(false);
      } catch (error) {
        toast.error("LogOut Failed")
      }
    }

  return (
    <>
    <div className="container flex px-2 py-5 sm:p-5  md:flex-row items-center sm:justify-end justify-between bg-blue-200 shadow-xl mb-2 rounded-xl sm:rounded-none">
        <Link onClick={() => {setIsOpen(false)}} className="mx-2 hidden sm:block" href={"/"}>Home</Link>
        <Link onClick={() => {setIsOpen(false)}} className="mx-2 sm:text-base text-2xl sm:hidden" href={"/"}><TiHome /></Link>
        <Link onClick={() => {setIsOpen(false)}} className="mx-2 sm:text-base text-xl" href={"/search"}><FaSearch/></Link>
        <Link onClick={() => {setIsOpen(false)}} className="mx-2 sm:text-base text-xl " href={"/cart"}><FaShoppingBag /></Link>

        {
            user?._id? (
                <>
                    {/* This button will only be displayed when the user id will have some value and the user exists  */}
                    <button onClick={() => {setIsOpen((prev) => !prev)}} className='ml-2 sm:text-base text-xl'><FaUser/></button>
                    {/* open true is use to display the dialog content when its true */}
                    <dialog open={isOpen} className=' absolute top-10 mt-2 mr-5 p-3 w-32 h-36 sm:h-32 border-4 rounded-lg border-slate-300'>
                        <div className='flex flex-col justify-between h-full w-full'>
                            {/* this link will only be displayed when the use role is admin */}
                            {/* {user.role === 'admin' && (
                                <Link onClick={() => {setIsOpen(false)}} href={'/admin'}>Admin</Link>
                            )} */}
                            <Link onClick={() => {setIsOpen(false)}} href={'/'}>Profile</Link>
                            <Link onClick={() => {setIsOpen(false)}} href={'/orders'}>Orders</Link>
                            <Link href={"/"}><button onClick={logoutHandler} className='flex items-center'>LogOut<FaSignOutAlt className='inline ml-3'/></button></Link>
                        </div>
                    </dialog>
                </>
                // this will be displayed id user is not present
            ) : ( 
              <div>
                {/* <Link href={'/login'} className='flex items-center gap-1 ml-2 mr-3'>LogIn<FaSignInAlt/></Link>  */}
                <Link href={'/signIn-email-pass'} className='flex items-center gap-1 ml-2 mr-3 '>LogIn<FaSignInAlt className='sm:text-base text-xl'/></Link>
              </div>
            )
        }
        {
          user?.role === "admin" && <Link onClick={() => {setIsOpen(false)}} href={'/admin'} className='ml-3'>Admin</Link>
        }
    </div>
    </>
    
  )
}

export default Header
export let userData;