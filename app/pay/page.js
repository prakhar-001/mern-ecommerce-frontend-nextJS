"use client"
import {Elements, PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from 'next/navigation';
import { useLocation } from "react-router-dom";
import { useNewOrderMutation } from "@/redux/api/orderAPI";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "@/redux/reducer/cartReducer";
import CustomerLayout from "@/components/Customer-Layout.js";


// const stripePromise = loadStripe("pk_test_51OtCtBSHCi2K8541jc5vPBxvq9j7f0uMZpWkYqnWJYGdstU1fLkyiwt34AVzIjETR28PnBedzlMLr0t2roFpWdFT00VEdEPG6d");
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState(false)

  const [newOrder] = useNewOrderMutation();

  const router = useRouter();

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id,
    };

    // const { paymentIntent, error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: { return_url: window.location.origin },
    //   redirect: "if_required",
    // });
    // console.log(orderData)
    const res = await newOrder(orderData);
    // dispatch(resetCart());

    //   console.log(res)
    // if ("data" in res) {
    //   toast.success(res.data.message);
    //   router.push("/orders")
    // } else {
    //   const error = res.error;
    //   const messageResponse = error.data ;
    //   toast.error(messageResponse.message);
    // }

    // if (error) {
    //   setIsProcessing(false);
    //   return toast.error(error.message || "Something Went Wrong");
    // }
    
    // if (paymentIntent.status === "succeeded") {
    //   const res = await newOrder(orderData);
    //   dispatch(resetCart());
    //   // responseToast(res, navigate, "/orders");
    //   if ("data" in res) {
    //     toast.success(res.data.message);
    //     router.push("/orders")
    //   } else {
    //     const error = res.error;
    //     const messageResponse = error.data ;
    //     toast.error(messageResponse.message);
    //   }
    // }
    setIsProcessing(false);
  }
    return <div>
      <form action="" onSubmit={submitHandler} className="flex items-center flex-col">
        <PaymentElement/>
        <button type="submit" disabled={isProcessing} className="bg-green-400 p-5 rounded-xl w-40 mt-10">
          {isProcessing? "Processing...": "Pay "}
        </button>
      </form>
    </div>
}

const PayOnDeliveryForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState(false)

  const [newOrder] = useNewOrderMutation();
  const PayOnDeliveryHandler = async () => {

    const orderData = {
      shippingInfo,
      subtotal,
      shippingCharges,
      tax,
      discount,
      total,
      user: user?._id,
      orderItems: cartItems,
    };
    
    const res = await newOrder(orderData);
    dispatch(resetCart());
        if ("data" in res) {
          toast.success(res.data.message);
          router.push("/")
        } else {
          const error = res.error;
          const messageResponse = error.data ;
          toast.error(messageResponse.message);
        }
  }
  return (
    <div className="flex items-center justify-center mt-10">
          <button onClick={PayOnDeliveryHandler} className="bg-blue-400 rounded-xl p-5 w-40">Pay On Delivery</button>
        </div>
  )
}

const Checkout = () => {
  // const location = useLocation();

  // const clientSecret = location.state;

  // if (!clientSecret) return redirect("/shipping");

  return (
    <CustomerLayout>
      <Elements options={{clientSecret: "pi_3OwN8jSHCi2K85410FLeh6FU_secret_RyKqbaQuKL0CCf5L1CM4OxgDf",}} stripe={stripePromise}>
        <CheckOutForm/>
        
        <PayOnDeliveryForm/>
      </Elements>
    </CustomerLayout>
  )
}

export default Checkout