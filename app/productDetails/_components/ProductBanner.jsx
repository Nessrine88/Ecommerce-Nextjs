import React from 'react'
import Image from 'next/image'

const ProductBanner = ({product}) => {
  return (
    <div className='w-96 h-96 bg-white shadow-lg rounded-t-lg overflow-hidden'>
        {product ?
        <Image 
        src={product?.image.url}
        alt='alt'
        width={400}
        height={400}
        objectFit='cover'
        className='h-full w-full'
        />:
        <div className='w-96 h-96 bg-slate-200 rounded-lg animate-pulse '></div>

        }
    </div>
  )
}

export default ProductBanner