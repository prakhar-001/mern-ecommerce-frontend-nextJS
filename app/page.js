"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/Product-Card.js";
import {useLatestProductsQuery} from "../redux/api/productAPI.js"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartReducer.js";
import CustomerLayout from "@/components/Customer-Layout.js";


const page = () => {
  
  // Fetching Products
  const {data, isLoading, isError, error} = useLatestProductsQuery("", {initialData: []}) //this will be used to fetch data from api
  // console.log(data)
  if (isLoading) {
    // console.log("Loading Products");
   } else if (isError) {
    toast.error("Can not Fetch the Products");
   } else {
    // console.log(data.products); // Now data.products will never be undefined
  }

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    if(cartItem.stock < 1) return toast.error("Out of Stock")
    dispatch(addToCart(cartItem)) //sending data to redux store
    toast.success("Added to Cart")
  }
  return (
    <>
      <CustomerLayout>
        <div className="container flex px-2 sm:px-5 flex-col ">
          <div className="h-[20vh] sm:h-[35vh] rounded-xl w-full overflow-hidden shadow-lg flex justify-center sm:items-center">
            <img src="https://www.searchenginejournal.com/wp-content/uploads/2020/12/ecommerce-mcommerce-featured-image-5fd09a3a5ff2a-1520x800.webp" alt="" className="h-[30vh] sm:h-[60vh] w-full sm:w-2/3 pb-14 sm:pb-32 sm:hidden"/>
            <img src="https://img.freepik.com/free-vector/ecommerce-web-store-hand-drawn-illustration_107791-10966.jpg?w=1380&t=st=1711446415~exp=1711447015~hmac=651d18798194ca8a85f0f1302d6d6609c93bcafa53957c823ec8e0cd23533c43" alt="" className="w-full h-[100vh] hidden sm:block"/>
          </div>
          <div className="flex justify-between font-sans text-xl sm:text-2xl py-2">
            <h1 className="">Latest Products</h1>
            <Link href={"/search"} className="text-lg sm:text-xl">More</Link>
          </div>
          <div className="flex flex-wrap">
            {
              //use data?. and not data.
              data?.products.map(i => (
                //send key to avoid key error
                <ProductCard key={i._id} productId={i._id} name={i.name} description={i.description} price={i.price} stock={i.stock} handler={addToCartHandler} photo={i.photo}></ProductCard>
                ))
              }

            
          </div>
        </div>
      </CustomerLayout>
    </>
  );
};

export default page;
