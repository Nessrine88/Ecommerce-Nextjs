'use client';
import React, { useContext, useState, useEffect } from 'react';
import { BadgeCheck, ShoppingCart } from 'lucide-react';
import SkeletonProduct from './SkeletonProduct';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApi from '../../_components/_utils/CartApi';
import { CartContext } from '../../_context/CartContext';

const ProductInfos = ({ product }) => {
    const { user } = useUser();
    const router = useRouter();

    // Set initial price state
    const [price, setPrice] = useState(null);

    useEffect(() => {
        if (product?.Price?.[0]?.price) {
            setPrice(product.Price[0].price);
        }
    }, [product]);

    const { cart, setCart } = useContext(CartContext);

    const handleAddToCart = () => {
        if (!user) {
            router.push('/sign-in');
        } else {
            const data = {
                data: {
                    userName: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    products: [product?.documentId],
                },
            };
            CartApi.addToCart(data)
                .then((res) => {
                    if (res?.data?.data?.documentId) {
                        setCart((oldCart) => [
                            ...cart,
                            {
                                documentId: res?.data?.data?.documentId,
                                product,
                                price,
                            },
                        ]);
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
    };

    const quantities = ['50ml', '100ml','250ml', '500ml', '1L', '2L', '3L', '4L', '5L'];

    const handlePrice = (e) => {
        const selectedQuantity = e.target.value;
        const index = quantities.indexOf(selectedQuantity);

        if (index !== -1 && product?.Price?.length > 0) {
            const selectedPrice = product?.Price[index]?.price;
            if (selectedPrice) {
                setPrice(selectedPrice);
            } else {
                console.log('Price not available for the selected quantity');
                setPrice(product?.Price?.[0]?.price);
            }
        } else {
            console.log('Invalid quantity selected or price data is not available');
            setPrice(product?.Price?.[0]?.price);
        }
    };

    return product ? (
        <div className="p-5 bg-sand-200 rounded-lg text-earth-brown shadow-lg bg-black">
            {/* Title */}
            <h2 className="text-[30px] font-bold text-dark-olive">{product?.title}</h2>

            {/* Category */}
            <h2 className="text-[15px] text-olive-green mt-2">Category: {product?.category}</h2>

            {/* Description */}
            <h2 className="text-[15px] text-earth-dark mt-5 leading-relaxed">{product?.description}</h2>

            {/* Instant Delivery Status */}
            <h2 className="text-[11px] mt-5 flex items-center gap-1">
                {product?.instantDelivery ? (
                    <div className="text-yellow-300 flex items-center gap-2 text-[14px]">
                        <BadgeCheck className="text-yellow-300 h-5 w-5" />
                        Eligible for instant delivery
                    </div>
                ) : (
                    <span className="text-red-500">Not eligible for instant delivery</span>
                )}
            </h2>

            {/* Price and Add to Cart */}
            <h2 className="text-[22px] text-dark-olive mt-5 flex items-center justify-between">
                <div>
                    {/* Quantity Select Dropdown */}
                    <select value={quantities[product?.Price?.findIndex(p => p.price === price)]} onChange={handlePrice}>
                        {quantities.map((qtt, index) => (
                            <option key={index} value={qtt}>
                                {qtt}
                            </option>
                        ))}
                    </select>

                    <span className="ml-5 text-white">{price} dt</span>
                </div>
                <button
                    className="flex items-center gap-3 bg-moss-green text-earth-light hover:bg-moss-dark md:px-10 px-2 py-2 rounded-lg transition-colors"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="h-5 w-5" />
                    Add To Cart
                </button>
            </h2>
        </div>
    ) : (
        <SkeletonProduct />
    );
};

export default ProductInfos;
