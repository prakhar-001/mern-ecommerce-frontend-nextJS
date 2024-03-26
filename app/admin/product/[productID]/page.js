"use client"
import React, {useEffect, useState} from 'react'
import AdminLayout from '@/components/Admin-Layout'
import { useSelector } from 'react-redux';
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from '@/redux/api/productAPI';
import { redirect,useRouter } from 'next/navigation';
import { FaTrash } from "react-icons/fa";
import { responseToast } from '@/utils/features';
import toast from 'react-hot-toast';


const page = ({params}) => {//here we have use params to access the id from the url

    const { user } = useSelector((state) => state.userReducer); // Getting details of the logged in user from redux 

    const { data, isLoading, isError } = useProductDetailsQuery(params.productID); // here we have to send id of the product to get the product details 

    const { price, photo, name, stock, category, description } = data?.product || { //destructing info if data present
        photo: "",
        category: "",
        name: "",
        description: "",
        stock: 0,
        price: 0,
    };

    const [priceUpdate, setPriceUpdate] = useState(price);
    const [stockUpdate, setStockUpdate] = useState(stock);
    const [nameUpdate, setNameUpdate] = useState(name);
    const [descriptionUpdate, setDescriptionUpdate] = useState(description);
    const [categoryUpdate, setCategoryUpdate] = useState(category);
    // const [photoUpdate, setPhotoUpdate] = useState("");
    const [photoFile, setPhotoFile] = useState(photo);

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    // const changeImageHandler = (e) => {
    //     const file = e.target.files?.[0];

    //     const reader = new FileReader();

    //     if (file) {
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         if (typeof reader.result === "string") {
    //         setPhotoUpdate(reader.result);
    //         setPhotoFile(file);
    //         }
    //     };
    //     }
    // };
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        if (nameUpdate) formData.set("name", nameUpdate);
        if (descriptionUpdate) formData.set("description", descriptionUpdate);
        if (priceUpdate) formData.set("price", priceUpdate.toString());
        if (stockUpdate !== undefined)
          formData.set("stock", stockUpdate.toString());
        if (photoFile) formData.set("photo", photoFile);
        if (categoryUpdate) formData.set("category", categoryUpdate);
    
        const res = await updateProduct({
          formData,
          userId: user?._id,
          productId: data?.product._id,
        });
    
        // responseToast(res,router, "/admin/products");
        if ("data" in res) {
            toast.success(res.data.message);
            router.push("/admin/products")
        } else {
            const error = res.error;
            const messageResponse = error.data ;
            toast.error(messageResponse.message);
        }
    };

    const deleteHandler = async () => {
        const res = await deleteProduct({
          userId: user?._id,
          productId: data?.product._id,
        });
    
        // responseToast(res,redirect, "/admin/products");
        if ("data" in res) {
            toast.success(res.data.message);
            router.push("/admin/products")
        } else {
            const error = res.error;
            const messageResponse = error.data ;
            toast.error(messageResponse.message);
        }
    };

    useEffect(() => { //this will run every time the data is changed and hence change the values 
        if (data) {
          setNameUpdate(data.product.name);
          setDescriptionUpdate(data.product.description);
          setPriceUpdate(data.product.price);
          setStockUpdate(data.product.stock);
          setCategoryUpdate(data.product.category);
          setPhotoFile(data.product.photo)
        }
    }, [data]);

    // if (isError) return <Navigate to={"/404"} />;

  return (
    <AdminLayout>
        <div className='flex flex-col sm:flex-row gap-2 ml justify-center mt-2 sm:mt-5 mx-2'>
            <section className='bg-slate-200 h-auto sm:h-[85vh] w-full sm:w-2/5 flex flex-col items-center p-5 justify-between rounded-xl'>
              <strong>Product ID - {data?.product._id}</strong>
              <div className='h-[25vh] w-[40vh] flex items-center justify-center'>
                {/* <img src={`${process.env.NEXT_PUBLIC_VITE_SERVER}/${photo}`} alt="Product" className=''/> */}
                <img src={photo} alt="Product" className='h-full w-auto'/>
              </div>
              <div className='flex gap-3 flex-col items-center mt-2'>
                <p className='font-semibold'>{name}</p>
                <p className='mx-2 sm:mx-10'>{description}</p>
                {stock > 0 ? (
                    <span className="text-green-500 text-xl">Stock: {stock} Available</span>
                ) : (
                    <span className="red"> Not Available</span>
                    )}
                <h3>Price: ₹{price}</h3>
              </div>
            </section >

            {/* <article className='bg-slate-200 h-[85vh] w-2/5 p-5 rounded-xl'> */}
              
              {/* <form onSubmit={submitHandler} className='flex flex-col items-center justify-between gap-5'> */}
              <form onSubmit={submitHandler} className='bg-slate-200 h-[65vh] sm:h-[85vh] w-full sm:w-2/5 p-1 rounded-xl flex flex-col items-center gap-2 sm:gap-5'>
                <div className='flex w-full justify-between items-center my-2 sm:my-5 px-2 sm:px-5'>
                    <h2 className='font-semibold text-lg'>Manage</h2>
                    <button className="hover:text-2xl hover:text-red-500" onClick={deleteHandler}>
                        <FaTrash />
                    </button>
                </div>
                <div className='flex flex-col w-full px-2 sm:px-5'>
                  <div className='flex items-center my-2 w-full '>
                    <label className='w-1/4 sm:w-1/5'>Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
                      className='w-3/4 sm:w-4/5 p-2 rounded-lg'
                      />
                  </div>
                  <div className='flex items-center my-2 w-full'>
                    <label className='w-1/4 sm:w-1/5'>Details </label>
                    <input
                      type="text"
                      placeholder="Description"
                      value={descriptionUpdate}
                      onChange={(e) => setDescriptionUpdate(e.target.value)}
                      className='w-3/4 sm:w-4/5 p-2 rounded-lg'
                      />
                  </div>
                  <div className='flex items-center my-2 w-full'>
                    <label className='w-1/4 sm:w-1/5'>Price</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={priceUpdate}
                      onChange={(e) => setPriceUpdate(Number(e.target.value))}
                      className='w-3/4 sm:w-4/5 p-2 rounded-lg'
                      />
                  </div>
                  <div className='flex items-center my-2 w-full'>
                    <label className='w-1/4 sm:w-1/5'>Stock</label>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stockUpdate}
                      onChange={(e) => setStockUpdate(Number(e.target.value))}
                      className='w-3/4 sm:w-4/5 p-2 rounded-lg'
                      />
                  </div>

                  <div className='flex items-center my-2 w-full'>
                    <label className='w-1/4 sm:w-1/5'>Category</label>
                    <input
                      type="text"
                      placeholder="eg. laptop, camera etc"
                      value={categoryUpdate}
                      onChange={(e) => setCategoryUpdate(e.target.value)}
                      className='w-3/4 sm:w-4/5 p-2 rounded-lg'
                      />
                  </div>
                  <div className='flex items-center my-2 w-full'>
                    <label className='w-1/4 sm:w-1/5'>Photo</label>
                    <input
                      type="text"
                      placeholder="Photo Public URL"
                      value={photoFile}
                      onChange={(e) => setPhotoFile(e.target.value)}
                      className='w-3/4 sm:w-4/5 p-2 rounded-lg'
                      />
                  </div>

                  {/* <div className='flex items-center my-2 w-full'>
                    <label className='w-1/4 sm:w-1/5'>Photo</label>
                    <input type="file" onChange={changeImageHandler} className='w-3/4 sm:w-4/5 p-2 rounded-lg text-sm sm:text-base'/>
                  </div>
                  <div className='felx items-center'>
                      {photoUpdate && <img src={photoUpdate} alt="New Image" className='w-40 h-24'/>}
                  </div> */}
                </div>
                <button type="submit" className='bg-green-300 p-2 rounded-lg w-32 mt-5'>Update</button>
              </form>
            {/* </article> */}
        </div>
    </AdminLayout>
  )
}

export default page