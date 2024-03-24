"use client"
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from '@/redux/api/orderAPI';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import OrderCardAdmin from "@/components/Order-Card-Admin.js";
import AdminLayout from '@/components/Admin-Layout'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';



const defaultData = {
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    user: { name: "", _id: "" },
    _id: "",
  };

const page = ({params}) => {
    const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data, isError } = useOrderDetailsQuery(params.transactionID);

  const {
    shippingInfo: { address, city, state, country, pincode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const router = useRouter();
  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id,
      orderId: data?.order._id,
    });
    console.log(res)
    if ("data" in res) {
        toast.success(res.data.message);
        router.push("/admin/transaction")
    } else {
        const error = res.error;
        const messageResponse = error.data ;
        toast.error(messageResponse.message);
    }
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id,
      orderId: data?.order._id,
    });
    console.log(res)
    if ("data" in res) {
        toast.success(res.data.message);
        router.push("/admin/transaction")
    } else {
        const error = res.error;
        const messageResponse = error.data ;
        toast.error(messageResponse.message);
    }
  };

  if (isError) return redirect("/admin/transaction");
  return (
    <AdminLayout>

    <div className='flex flex-col sm:flex-row gap-2 ml justify-center my-5 mx-2'>
            <section className='bg-slate-200 h-full sm:h-[85vh]  w-full sm:w-2/5 flex flex-col items-center p-5 justify-start gap-2 rounded-xl'>
              <h2 className='text-xl font-semibold'>Order Items</h2>

              {orderItems.map((i) => (
                <OrderCardAdmin
                  key={i._id}
                  name={i.name}
                  photo={i.photo}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className='bg-slate-200 h-[70vh] sm:h-[85vh] w-full sm:w-2/5 p-5 rounded-xl flex flex-col items-center  gap-5    '>
                <div className='flex items-center justify-between mt-5 mb-3 w-full'>
                    <h2 className='font-semibold text-lg'>Order Info</h2>
                    <button className="product-delete-btn hover:text-red-500 hover:text-2xl" onClick={deleteHandler}>
                        <FaTrash />
                    </button>
                </div>
              
              <div className='w-full'>
                <h5 className='font-semibold '>User Info</h5>
                <p>Name: {name}</p>
                <p>
                    Address:{" "}
                    {`${address}, ${city}, ${state}, ${country} ${pincode}`}
                </p>
              </div>
              <div className='w-full'>
                <h5 className='font-semibold '>Amount Info</h5>
                <p>Subtotal: {subtotal}</p>
                <p>Shipping Charges: {shippingCharges}</p>
                <p>Tax: {tax}</p>
                <p>Discount: {discount}</p>
                <p>Total: {total}</p>
              </div>

              <div className='w-full'>
                <h5 className='font-semibold '>Status Info</h5>
                <p>
                    Status:{" "}
                    <span className={`text-green-500 text-xl`}>
                    {status}
                    </span>
                </p>
              </div>
              <button className="shipping-btn bg-blue-400 p-2 rounded-lg w-3/5 mt-5" onClick={updateHandler}>
                Process Status
              </button>
            </article>
    </div>
    </AdminLayout>

  )
}

export default page