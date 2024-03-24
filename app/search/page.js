"use client"
import ProductCard from '@/components/Product-Card.js';
import CustomerLayout from "@/components/Customer-Layout.js";
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';

// API's
import { useCategoriesQuery, useSearchProductsQuery } from '@/redux/api/productAPI';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/reducer/cartReducer';

const page = () => {
    // Fetching Categories
    const {data: categoriesData, isLoading: loadingCategories, isError: categoryIsError, error: categoryError} = useCategoriesQuery("")
    if(categoryIsError) toast.error(categoryError.data.message)
  
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(200000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
  
    // Fetching Products
    const { isLoading: productLoading, data: searchData, isError: productIsError, error: productError } = useSearchProductsQuery({search, sort, category, page, price: maxPrice})
    // console.log(searchData?.products)
    if(productIsError) toast.error(productError.data.message)


    const dispatch = useDispatch();
    const addToCartHandler = (cartItem) => {
      if(cartItem.stock < 1) return toast.error("Out of Stock")
      dispatch(addToCart(cartItem)) //sending data to redux store
      toast.success("Added to Cart")
    }

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  return (
    <CustomerLayout>
    <div className='search-page flex flex-col sm:flex-row justify-between p-2 sm:p-5'>
      <div className="left border-2 w-full sm:w-1/6 p-2 sm:p-5 rounded-xl">
        <h2 className='text-xl'>Filters</h2>
        <div className='flex flex-row sm:flex-col items-center sm:items-start '>
          <div className='p-2'>
            <h4 className='font-bold p-2'>Sort</h4>
            <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)} className='p-1 sm:p-2 border-2 rounded-xl'>
              <option value=''>None</option>
              <option value='asc'>Price (Low to High)</option>
              <option value='dsc'>Price (High to Low)</option>
            </select>
          </div>

          <div className='px-2 py-0 sm:p-2'>
            <h4 className='font-bold p-2'>Max Price {maxPrice || ""}</h4>
            <input type='range' min={500} max={200000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className='p-1 sm:p-2 border-2 rounded-xl'/>
          </div>
        </div>

        <div className='p-2'>
          <h4 className='font-bold p-2'>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='p-2 border-2 rounded-xl w-full'>
            <option value=''>All</option>
            {/* Loading Categories */}
            {
              !loadingCategories && categoriesData?.categories.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="right w-full sm:w-5/6 p-2 sm:p-5 pt-0 flex flex-col">
        <div className="right-up">
          <h1 className='text-3xl'>Products</h1>
          <input type="text" placeholder='Search by name...' value={search} onChange={(e) => setSearch(e.target.value)} className='border-2 p-1 pl-5 rounded-xl w-full my-2'/>
        </div>

        <div className="right-down flex flex-col ">
          <div className="-search-product-list flex flex-wrap">
            {
              searchData?.products.map(i => (
                <ProductCard key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock} handler={addToCartHandler} photo={i.photo}></ProductCard>
              ))
            }
          </div>

          {
            searchData?.totalPage>1 && (
              <article className='flex items-center justify-center mt-10'>
              <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)} className='h-8 w-20 rounded-xl bg-slate-400 mx-2'>prev</button>
              <span>{page} of {searchData.totalPage}</span>
              <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)} className='h-8 w-20 rounded-xl bg-slate-400 mx-2'>next</button>
            </article>
            )
          }
          
        </div>
      </div>
    </div>
    </CustomerLayout>
  )
}

export default page