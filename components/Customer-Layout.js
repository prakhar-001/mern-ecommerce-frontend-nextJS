import React from 'react'
import Header from "../components/Header.js";


const CustomerLayout = ({children}) => {
  return (
    <>
    <div className='flex flex-col '> 
      <div className='fixed w-full'>
        <div className='mx-1 sm:mx-0'>
          <Header/>
        </div>
      </div>
      <div className='mt-20'>{children}</div>
    </div>
    </>
  )
}

export default CustomerLayout