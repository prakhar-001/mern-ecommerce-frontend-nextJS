import React from 'react'
import Link from 'next/link'

import { IoStatsChart } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

const AdminSidebar = () => {
  return (
    <div className='flex flex-row sm:flex-col justify-between gap-2 px-2 mx-2 py-4 sm:p-5'>
        <Link href={'/admin'} className='hidden sm:block'>Dashboard </Link>
        <Link href={'/admin/products'} className='hidden sm:block'>Products</Link>
        <Link href={'/admin/customers'} className='hidden sm:block'>Customers</Link>
        <Link href={'/admin/transaction'} className='hidden sm:block'>Transactions</Link>

        <Link href={'/admin'} className='text-2xl sm:hidden'><IoStatsChart /></Link>
        <Link href={'/admin/products'} className='text-2xl sm:hidden'><FaShop /></Link>
        <Link href={'/admin/customers'} className='text-2xl sm:hidden'><FaUsers /></Link>
        <Link href={'/admin/transaction'} className='text-2xl sm:hidden'><GiTakeMyMoney /></Link>
    </div>
  )
}

export default AdminSidebar