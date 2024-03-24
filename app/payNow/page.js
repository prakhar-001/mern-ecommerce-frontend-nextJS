"use client"
import {Elements, useStripe,PaymentElement,useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { useSelector } from 'react-redux'

const stripeKey = loadStripe("pk_test_51OtCtBSHCi2K8541jc5vPBxvq9j7f0uMZpWkYqnWJYGdstU1fLkyiwt34AVzIjETR28PnBedzlMLr0t2roFpWdFT00VEdEPG6d");


const CheckOutForm = () => {
    const stripe = useStripe()

    const {cartItems} = useSelector(state => state.cartReducer);
    console.log(cartItems)


    const makePayment = async()=>{
        // const stripe = await loadStripe("pk_test_51OtCtBSHCi2K8541jc5vPBxvq9j7f0uMZpWkYqnWJYGdstU1fLkyiwt34AVzIjETR28PnBedzlMLr0t2roFpWdFT00VEdEPG6d");

        const body = {
            products:cartItems
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:4000/api/v1/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id,
        });
        
        if(result.error){
            console.log(result.error);
        }
    }
      return (
        <div className='flex items-center justify-center'>
            <button onClick={makePayment} className='p-5 rounded-xl bg-green-400'>Pay Now</button>
        </div>
      )
  }

const page = () => {


    return (
        // <Elements options={{clientSecret: "pi_3OwN8jSHCi2K85410FLeh6FU_secret_RyKqbaQuKL0CCf5L1CM4OxgDf",}} stripe={stripePromise}>
        <Elements  stripe={stripeKey} >
            <CheckOutForm/>
        </Elements>
    )
}

export default page