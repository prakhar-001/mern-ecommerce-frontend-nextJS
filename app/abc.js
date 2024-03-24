"use client"
import React from 'react'
import {onAuthStateChanged} from "firebase/auth"
import { useEffect, useState } from 'react'
import {auth} from "../firebase.js"
import { userExist, userNotExist } from '@/redux/reducer/userReducer.js'
import { useDispatch } from 'react-redux'
import { getUserData } from '@/redux/api/userApi.js'


export function Abc () {
    const [userData, setUserData] = useState();
    const [userExists, setUserExists] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {

        // return onAuthStateChanged(auth, (user) => setUserData(user));
    
         onAuthStateChanged(auth, async (user) => {
            // const userData = user;
          if(user){
            const data = await getUserData(user.uid)
            console.log("Logged In ABC")
            // console.log(data.user)
            setUserData(data.user.email)
            setUserExists(true)
            dispatch(userExist(data.user))
            // return userData;
          }else{
            console.log("Not Logged in ABC")
            dispatch(userNotExist());
          }
        })
    }, []);
    console.log("ABC aaya hai shayad "+userData)
    return {userData, userExists};
}