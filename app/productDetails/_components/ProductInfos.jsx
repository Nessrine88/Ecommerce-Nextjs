'use client'
import React, { useContext } from 'react'
import { BadgeCheck, ShoppingCart } from 'lucide-react'
import SkeletonProduct from './SkeletonProduct'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApi from '../../_components/_utils/CartApi'
import { CartContext } from '../../_context/CartContext'

const ProductInfos = ({ product }) => {
    const { user } = useUser();
    const router = useRouter();
    const { cart, setCart } = useContext(CartContext)

    const handleAddToCart = () => {
        if (!user) {
            router.push('/sign-in')
        } else {
            const data = {
                data: {
                    userName: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    products: [product?.documentId]
                }
            }
            CartApi.addToCart(data).then(res => {
                setCart(oldCart => [
                    ...cart,
                    {
                        documentId: res?.data?.data?.documentId,
                        product
                    }
                ]);
            }).catch((error) => { console.log('error', error); })
        }
    }

    return (
        product ? (
            <div className="p-5 bg-teal-950 rounded-lg text-teal-100 shadow-lg">
                {/* Title */}
                <h2 className="text-[30px] font-bold text-teal-50">
                    {product?.title}
                </h2>

                {/* Category */}
                <h2 className="text-[15px] text-teal-300 mt-2">
                    Category: {product?.category}
                </h2>

                {/* Description */}
                <h2 className="text-[15px] text-teal-200 mt-5 leading-relaxed">
                    {product?.description}
                </h2>

                {/* Instant Delivery Status */}
                <h2 className="text-[11px] mt-5 flex items-center gap-1">
                    {product?.instantDelivery ? (
                        <div className="text-teal-100 flex items-center gap-2 text-[14px]">
                            <BadgeCheck className="text-yellow-400 h-5 w-5" />
                            Eligible for instant delivery
                        </div>
                    ) : (
                        <span className="text-red-400">Not eligible for instant delivery</span>
                    )}
                </h2>

                {/* Price and Add to Cart */}
                <h2 className="text-[22px] text-teal-50 mt-5 flex items-center justify-between">
                    {product?.price} dt
                    <button
                        className="flex items-center gap-3 bg-green-700 text-teal-100 hover:bg-green-600 px-10 py-2 rounded-lg transition-colors"
                        onClick={() => handleAddToCart()}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Add To Cart
                    </button>
                </h2>
            </div>
        ) : (
            <SkeletonProduct />
        )
    )
}

export default ProductInfos
