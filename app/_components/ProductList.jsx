import React from 'react'
import { ProductItem } from './ProductItem'

const ProductList = ({productList}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10'>
        {productList?.map((item)=>(
            <div key={item.id}><ProductItem item={item} /> </div>
        ))}

    </div>
  )
}

export default ProductList