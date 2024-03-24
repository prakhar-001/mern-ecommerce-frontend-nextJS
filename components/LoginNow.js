import React from 'react'
import Link from "next/link"

const LoginNow = () => {
  return (
    <div className='p-28 bg-slate-400 flex items-center flex-col gap-10'>
        <h1>Login First To Add Items In Your Cart</h1>
        <Link href={'/login'}>Login Now</Link>
    </div>
  )
}

export default LoginNow