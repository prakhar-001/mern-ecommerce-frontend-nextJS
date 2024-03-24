"use client"
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// import { SerializedError } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';

// import moment from "moment";

export const responseToast = (res,router,url) => {
  if ("data" in res) {
    toast.success(res.data.message);
    // if (abc) {
      // redirect("/cart");
      router(url)
    // }
  } else {
    const error = res.error;
    const messageResponse = error.data ;
    toast.error(messageResponse.message);
  }
};

// export const getLastMonths = () => {
//   const currentDate = moment();

//   currentDate.date(1);

//   const last6Months = [];
//   const last12Months = [];

//   for (let i = 0; i < 6; i++) {
//     const monthDate = currentDate.clone().subtract(i, "months");
//     const monthName = monthDate.format("MMMM");
//     last6Months.unshift(monthName);
//   }

//   for (let i = 0; i < 12; i++) {
//     const monthDate = currentDate.clone().subtract(i, "months");
//     const monthName = monthDate.format("MMMM");
//     last12Months.unshift(monthName);
//   }

//   return {
//     last12Months,
//     last6Months,
//   };
// };
