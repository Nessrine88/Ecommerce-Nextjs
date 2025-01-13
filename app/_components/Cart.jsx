import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext'
import { Link } from 'lucide-react'

const Cart = () => {

  const { cart } = useContext(CartContext);

  console.log("cart:", cart);
  return (
    <div className='h-[600px] w-[400px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-72 top-12 p-5 overflow-auto '>
         <div className="mt-4 space-y-6">
    <ul className="space-y-4">
        {cart?.map((item) => (

<li key={item.id} className="flex items-center gap-4">
<img
  src={item?.product?.image.url}
  alt=""
  className="size-16 rounded object-cover"
/>

<div>
  <h3 className="text-sm text-gray-900">{item?.product?.title} </h3>

  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
    <div>
      <dt className="inline">Category:</dt>
      <dd className="inline">{item?.product?.category}</dd>
    </div>

    <div>
      <dt className="inline">Price:</dt>
      {/* <dd className="inline">{item.initialPrice}dt</dd> */}
    </div>
  </dl>
</div>

<div className="flex flex-1 items-center justify-end gap-2">

  <button className="text-gray-600 transition hover:text-red-600">



  </button>
</div>
</li>
        ))}



    </ul>
    </div>
    <div className="space-y-4 text-center mt-5">
      <a
        href="/cart"
        className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
      >
        View my cart ({cart ? cart.length : 0})
      </a>


      <a
        href="#"
        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
      >
        Continue shopping
      </a>
    </div>
    </div>
  )
}

export default Cart