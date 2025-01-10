import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const ProductItem = ({ item }) => {
  return (
    <Link href={`/productDetails/${item?.documentId}`}>
      <div className='h-[500px] py-10'>
    {item.image.url ? 
        <Image
          src={item?.image?.url || '/default-image.jpg'}
          width={1000}
          height={1000}
          alt={item.title}
          className="rounded-t-lg w-full h-full"
          objectFit='cover'
        />:
        <div className='w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse '></div>
        }

  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>

  <p className="mt-2 max-w-sm text-gray-700">
  {item.description}
  </p>
  <div>
          {item.price}dt{/* Display product price */}
        </div>
        </div>
    </Link>
  )
}
