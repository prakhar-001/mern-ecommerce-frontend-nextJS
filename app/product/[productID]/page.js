"use client"
import { useProductDetailsQuery } from '@/redux/api/productAPI';
import React from 'react'
import CustomerLayout from "@/components/Customer-Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducer/cartReducer.js";
import toast from "react-hot-toast";


const page = ({params}) => {
    const productId = params.productID
    
    const { data, isLoading, isError } = useProductDetailsQuery(productId); // here we have to send id of the product to get the product details 
    
    // console.log(data?.product)
    
    const { price, photo, name, stock, category, description } = data?.product || { //destructing info if data present
        photo: "",
        category: "",
        name: "",
        description: "",
        stock: 0,
        price: 0,
    };

    const dispatch = useDispatch();
    const addToCartHandler = (cartItem) => {
        if(cartItem.stock < 1) return toast.error("Out of Stock")
        dispatch(addToCart(cartItem)) //sending data to redux store
        toast.success("Added to Cart")
      }

    // console.log(name, description, price, stock, category, photo)

    
    let sessionStatus;
    const abc = useSelector((state) => state.userReducer.user);
    if (abc) {
        // console.log(abc.role)
        sessionStatus = true;
    } else {
        sessionStatus = false;
    }
  return (
    <CustomerLayout>
    <div className='mx-2 sm:mx-40 mt-5 sm:my-20'>
        <div className='flex flex-col sm:flex-row'>
            <div className="photo-container w-full sm:w-1/2 flex justify-center items-center ">
                <img src={photo} alt="Loading Product Image" className='h-40 sm:h-full w-auto px-20 object-contain'/>
            </div>
            <div className="detail-container w-full sm:w-1/2 flex flex-col gap-2 sm:gap-6 mt-5">
                <div>
                    <div className='text-2xl font-bold '>{name}</div>
                    <div className='mt-5'>{description}</div>
                </div>
                <div>{category}</div>
                <div>
                    <div className='font-semibold'>₹{price}</div>
                    {stock<5? 
                        <div className='text-red-400'>Only {stock} Available!!! Order Now</div> 
                        : 
                        <div></div>
                    }
                </div>
                
                {
                sessionStatus?
                <div>
                    <button onClick={() => addToCartHandler({productId, price, name, description, photo, stock, quantity: 1})} className='bg-green-400 p-3 w-32 rounded-xl'>Add to Cart</button>
                </div>
                :
                <div>
                    <button onClick={() => toast.error("Login to Add Item in your Cart")} className='bg-red-400 p-3 w-32 rounded-xl'><s>Add to Cart</s></button>
                </div>
                }
            </div>
        </div>
    </div>
    </CustomerLayout>
  )
}

export default page