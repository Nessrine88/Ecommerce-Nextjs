import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const ProductItem = ({ item }) => {
  return (
    <Link href={`/productDetails/${item?.documentId}`}>
      <div className='w-full h-auto bg-teal-950 shadow-lg rounded-t-lg overflow-hidden'>
        {item.image.url ? (
          <Image
            src={item?.image?.url || '/default-image.jpg'}
            width={1000}
            height={1000}
            alt={item.title}
            className="h-56 w-full rounded-bl-3xl rounded-tr-3xl object-cover sm:h-64 lg:h-72"
          />
        ) : (
          <div className='w-full h-56 bg-teal-900 rounded-lg animate-pulse'></div>
        )}

        <div className="p-4">
          <h3 className="mt-2 text-lg font-bold text-teal-100 sm:text-xl">{item.title}</h3>
          <p className="mt-2 max-w-sm text-teal-200 opacity-90 line-clamp-3">
            {item.description}
          </p>
          <div className="mt-2 text-teal-50 font-semibold">
            {item.price}dt{/* Display product price */}
          </div>
        </div>
      </div>
    </Link>
  )
}
