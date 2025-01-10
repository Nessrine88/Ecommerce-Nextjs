'use client'
import React, { useContext } from 'react'
import { BadgeCheck, ShoppingCart } from 'lucide-react'
import SkeletonProduct from './SkeletonProduct'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApi from '../../_components/_utils/CartApi'
import { CartContext } from '../../_context/CartContext'

const ProductInfos = ({product}) => {
    const {user} =useUser();
    const router = useRouter();
    const {cart, setCart} = useContext(CartContext)
    const handleAddToCart = ()=> {
        if(!user){
router.push('/sign-in')
        }else {
            const data ={
              data:{
                userName: user.fullName,
                email: user.primaryEmailAddress.emailAddress,
                products: [product?.documentId]
            }  
            }
CartApi.addToCart(data).then(res=>{
    setCart(oldCart => [
        ...cart,
        {
            documentId: res?.data?.data?.documentId,
            product
        }
    ]);
    
}).catch((error)=>{console.log('error',error);
})
        }
    }
  return (
    product ? (
    <div>
        <h2 className='text-[20px]'>
            {product?.title}
        </h2>
        <h2 className='text-[15px] text-primary'>
            {product?.category }
        </h2>
        <h2 className='text-[15px] text-primary line-clamp-1'>
            {product?.description}
        </h2>
            <h2 className='text-[11px] text-gray-900 flex items-center gap-1 mt-5'>
            {product?.instantDelivery
            ? <div className='text-green-500 flex items-center gap-2 text-[14px]'>
            <BadgeCheck className='text-green-500 h-5 w-5' />
            Eligible for instant delivery
            </div>
            : 'Not eligible for instant delivery'
            }
            </h2>

        <h2 className='text-[22px] text-primary mt-5 line-clamp-1'>
        {product?.price} dt
        <button className='flex items-center gap-3 bg-green-900 px-10 py-2 rounded-lg' onClick={()=> handleAddToCart()}><ShoppingCart /> Add To Cart</button>
        </h2>

    </div>):(<SkeletonProduct />)
  )
}

export default ProductInfos