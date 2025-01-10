import React from 'react'
import Image from 'next/image'

const ProductBanner = ({ product }) => {
  return (
    <div className='w-full h-auto bg-teal-950 shadow-lg rounded-t-lg overflow-hidden'>
      {product ? (
        <div>
          <Image
            alt=""
            src={product?.image.url}
            width={1000}
            height={1000}
            className="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-center sm:h-64 lg:h-72"
          />
          <div className="mt-2 sm:flex sm:items-center justify-center sm:gap-4">
            <strong className="font-bold text-[30px] text-center px-5">{product.title}</strong>
            <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-yellow-500 px-5"></span>
            <p className="text-[14px] opacity-50 sm:mt-0 px-5">Sultan-oils</p>
          </div>
        </div>
      ) : (
        // Corrected loading state
        <div className='w-full h-96 bg-slate-200 rounded-lg animate-pulse'></div>
      )}
    </div>
  )
}

export default ProductBanner
