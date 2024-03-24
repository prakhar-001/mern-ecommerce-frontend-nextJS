"use client"
import AdminLayout from '@/components/Admin-Layout'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';


import { responseToast } from "@/utils/features.js";

// API
import { useNewProductMutation } from '@/redux/api/productAPI'
import toast from 'react-hot-toast';

const page = () => {

  const {user, loading} = useSelector(state => state.userReducer)

  const [newProduct] = useNewProductMutation();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(1000);
  const [stock, setStock] = useState(1);
  // const [photoPrev, setPhotoPrev] = useState("");
  const [photo, setPhoto] = useState("");

  // const changeImageHandler = (e) => {
  //   const file = e.target.files?.[0];

  //   const reader = new FileReader();

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         setPhotoPrev(reader.result);
  //         setPhoto(file);
  //       }
  //     };
  //   }
  // };
  const router = useRouter();

  const submitHandler =async (e) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({ id: user?._id, formData });

    // responseToast(res, redirect, "/admin/products");
    if ("data" in res) {
      toast.success(res.data.message);
      router.push("/admin/products")
    } else {
      const error = res.error;
      const messageResponse = error.data ;
      toast.error(messageResponse.message);
    }
  }

  return (
    <AdminLayout>
      <div className='flex flex-col items-center justify-center p-5'>
        <h1 className='my-5 text-2xl font-semibold'>New Product</h1>
        <form action="" onSubmit={submitHandler} className='flex flex-col items-center gap-4'>          
            <div className='flex flex-col w-96'>
              <label className='ml-1'>Name</label>
              <input required type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value) } className='p-2 rounded-lg border-2' />
            </div>
            <div className='flex flex-col w-96'  >
              <label>Price</label>
              <input required type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} className='p-2 rounded-lg border-2' />
            </div>
            <div className='flex flex-col w-96'>
              <label>Stock</label>
              <input required type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} className='p-2 rounded-lg border-2' />
            </div>

            <div className='flex flex-col w-96'>
              <label>Category</label>
              <input required type="text" placeholder="eg. laptop, camera etc" value={category} onChange={(e) => setCategory(e.target.value)} className='p-2 rounded-lg border-2' />
            </div>
            <div className='flex flex-col w-96'>
              <label>Photo</label>
              <input required type="text" placeholder="Photo Public URL" value={photo} onChange={(e) => setPhoto(e.target.value)} className='p-2 rounded-lg border-2' />
            </div>

            {/* <div className='flex flex-col w-96 '>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} className='p-2 rounded-lg border-2' />
            </div> */}

          <button type='submit' className='bg-green-400 px-3 py-2 rounded-xl w-40 text-sm font-semibold'>Create Product</button>
        </form>
      </div>

    </AdminLayout>
  )
}

export default page