"use client";
import CartItem from "@/components/Cart-Item.js";
// import { timeLog } from "console";
import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
// import { DiVim } from "react-icons/di";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import LoginNow from "@/components/LoginNow.js"
import CustomerLayout from "@/components/Customer-Layout.js";
import LoggedInCustomerOnlyLayout from "@/components/Logged-In-Customer-Only-Layout.js";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "@/redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";


const page = () => {

  const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector(state => state.cartReducer) // fetching item detail from redux

  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);
  
  // REDUX
  const dispatch = useDispatch();
  const incrementHandler = (cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return toast.error("Limited Stock Available");// this will ensure that the quantity in cart is equal to or less than stock available

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId) => {
    dispatch(removeCartItem(productId));
  };

  // Coupon
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios.get(`${process.env.NEXT_PUBLIC_VITE_SERVER}/api/v1/payment/discount?coupon=${couponCode}`, { cancelToken, })
        .then((res) => {
          dispatch(discountApplied(res.data.discount))
          setIsValidCouponCode(true);
          dispatch(calculatePrice())
        })
        .catch(() => {
          dispatch(discountApplied(0))
          setIsValidCouponCode(false);
          dispatch(calculatePrice())
        });
    }, 1000)

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false)
    }
  }, [couponCode])

  // Total
  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])


  return (
    <>
      <CustomerLayout>
        <LoggedInCustomerOnlyLayout>
        <div className="p-2 sm:p-5 pt-0">
          <div className="pl-4 pt-3 text-xl">Cart Items</div>
          <div className="flex flex-col sm:flex-row ">
            {/* Cart Items */}
            <div className="left w-full sm:w-4/6 ">
              <div className="flex flex-col">
                {cartItems.length > 0 ? cartItems.map((i, idx) => (
                  <CartItem
                    key={idx}
                    cartItem={i}
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    removeHandler={removeHandler} />
                    )) : <h1>No items Added</h1>
                  }
              </div>
            </div>

            {/* Total */}
            <div className="right w-full sm:w-2/6 ">
                <div className="p-5 sm:p-20 flex flex-col gap-5 shadow-xl bg-slate-200 shadow-slate-300 rounded-xl mt-3 mb-5">
                  <div className="flex flex-col gap-2">
                    <p>Subtotal : ₹{subtotal}</p>
                    <p>Shipping Charges : ₹{shippingCharges}</p>
                    <p>Shipping Tax : ₹{tax}</p>
                    <p>
                      Discount: <em>- ₹{discount}</em>
                    </p>
                    <p>
                      <b>Total : ₹{total}</b>
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Apply Coupon Code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                    className="border-4 rounded p-1"
                    />

                  {couponCode && (
                    isValidCouponCode ? (
                      <span className="text-green-500">
                        ₹{discount} off using the <code>{couponCode}</code>
                      </span>
                    ) : (
                      <span className="text-red-500 flex flex-row items-center pt-0">
                        Invalid Coupon <VscError />
                      </span>
                    )
                    )}

                  {
                    cartItems.length > 0 && <div className="flex items-center justify-center"><Link href={'/shipping'} className="bg-green-400 w-full h-10 rounded flex items-center justify-center">Checkout</Link></div>
                  }
                </div>
            </div>
          </div>
        </div>
        </LoggedInCustomerOnlyLayout>
      </CustomerLayout>
    </>
  );
};

export default page;
