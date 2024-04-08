"use client"
import { useProductDetailsQuery, useGetRecentProductsInCategoryQuery } from '@/redux/api/productAPI';
import React from 'react'
import CustomerLayout from "@/components/Customer-Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducer/cartReducer.js";
import toast from "react-hot-toast";
import Link from 'next/link';
import { useNewItemWishlistMutation } from "@/redux/api/wishlistAPI";
import { FaHeart } from "react-icons/fa6";


const page = ({params}) => {
    const productId = params.productID
    
    const { user } = useSelector((state) => state.userReducer);

    const { data, isLoading, isError } = useProductDetailsQuery(productId); // here we have to send id of the product to get the product details 
    
    // console.log(data?.product)

    
    const { price, photo, name, stock, category, description, _id } = data?.product || { //destructing info if data present
        photo: "",
        category: "",
        name: "",
        description: "",
        stock: 0,
        price: 0,
    };
    
    // console.log(_id)

    const [newItemWishlist] = useNewItemWishlistMutation();
    const addToWishlistHandler = async () => {
        const itemData = {
            wishlistItem: {
                name,
                description,
                photo,
                price,
                stock,
                productId: _id,
            },
            user: user?._id
        }
        const res = await newItemWishlist(itemData)
        if ("data" in res) {
          toast.success(res.data.message);
        } else {
          const error = res.error;
          const messageResponse = error.data ;
          toast.error(messageResponse.message);
        }
    }


    // Fetching Products
    const { isLoading: productLoading, data: searchData, isError: productIsError, error: productError } = useGetRecentProductsInCategoryQuery({category})
    let similarProductsData = searchData?.recentProductsInCategory;
    // console.log(searchData?.recentProductsInCategory)
    // console.log(similarProductsData)
    // if(productLoading) toast.error("Loading")

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
    <div className='mx-2 sm:mx-10 mt-5 sm:my-7 '>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 '>
            {/* Product Data */} 
            <div className='w-full flex flex-col sm:flex-row border-2 bg-grey-200 shadow-lg rounded-xl p-5'>
                {/* Product Image Container */}
                <div className="photo-container w-full sm:w-1/2 flex justify-center items-center ">
                    <img src={photo} alt="Loading Product Image" className='h-40 sm:h-full w-auto px-20 object-contain'/>
                </div>

                {/* Product Details Container */}
                <div className="detail-container w-full sm:w-1/2 flex flex-col gap-2 sm:gap-6 mt-5">
                    <div>
                        <div className='flex justify-between items-center'>
                            <div className='text-2xl font-bold '>{name}</div>
                            <button onClick={addToWishlistHandler} className='text-xl hover:text-red-500 bg-slate-300 rounded-full p-2'><FaHeart /></button>
                        </div>
                        <div className='mt-5'>{description}</div>
                    </div>
                    <div>{category}</div>
                    <div>
                        <div className='font-semibold'>₹{price}</div>
                        {stock<50? 
                            <div className='text-red-400'>Only {stock} Available!!! Order Now</div> 
                            : 
                            <div></div>
                        }
                    </div>
                    
                    {
                        sessionStatus?
                        <div>
                        <button onClick={() => addToCartHandler({productId, price, name, description, photo, stock, quantity: 1})} className='bg-green-400 p-2 px-3 w-32 rounded-xl'>Add to Cart</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => toast.error("Login to Add Item in your Cart")} className='bg-red-400 p-3 w-32 rounded-xl'><s>Add to Cart</s></button>
                    </div>
                    }
                </div>
            </div>

            {/* Similar Products */}
            <div className='w-full sm:w-1/3 p-2 border-2 bg-grey-200 rounded-xl shadow-lg'>
                <h1 className='font-semibold pl-3 sm:pl-0'>Similar Products</h1>
                {
                    similarProductsData? 
                    <div >
                        {
                            similarProductsData.map(i => (
                                <div key={i._id} className='flex my-2 shadow-xl p-2 rounded-lg sm:hover:bg-slate-200 h-28 items-center gap-2'>
                                    <div className="Image_Container w-2/5 flex items-center justify-center">
                                        <Link href={`/product/${i._id}`}>
                                            <img src={i.photo} alt="" className='content-center object-contain h-20'/>
                                        </Link>
                                    </div>
                                    <div className='w-3/5 text-md'>
                                        <p>{i.name}</p>
                                        <p>₹{i.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div>
                        Not Exist
                    </div>
                }
            </div>
        </div>
    </div>
    </CustomerLayout>
  )
}

export default page