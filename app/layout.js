"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <Provider store={store}>
            {/* <Header/> */}
            {children}
            <Toaster position="bottom-center"/>
          </Provider>
        </>
      </body>
    </html>
  );
}
