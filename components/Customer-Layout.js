import React from 'react'
import Header from "../components/Header.js";


const CustomerLayout = ({children}) => {
  return (
    <>
    <Header/>
    <div>{children}</div>
    </>
  )
}

export default CustomerLayout