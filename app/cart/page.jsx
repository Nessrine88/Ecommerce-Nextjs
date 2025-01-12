"use client"
import React, { useContext, useEffect } from 'react'
import { CartContext } from '../_context/CartContext'
import Footer from '../_components/Footer'
import CartApi from '../_components/_utils/CartApi'
import { useRouter } from 'next/navigation'

const Cart = () => {
    const router =useRouter()
    const { cart, setCart } = useContext(CartContext)

    const getTotalAmount = () => {
        let totalAmount = 0
        cart?.forEach(item => {
            totalAmount = totalAmount + Number(item?.product?.price)
        });
        return totalAmount
    }

    const deleteCartItemFromList = (documentId) => {
        console.log('Deleting item with documentId:', documentId); // Debugging

        // Perform the delete operation
        CartApi.deleteCartItem(documentId).then((res) => {     
            if (res.status === 204) {
                setCart(prevCart => {
                    const updatedCart = prevCart.filter(item => item.documentId !== documentId);
                    return updatedCart;
                });
            } else {
                console.error("Unexpected response status:", res.status);
            }
        }).catch(err => {
            console.error("Error deleting cart item", err); // Error handling
        });
    };

    useEffect(() => {
    }, [cart]); // Logs cart every time it changes

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mb-16">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                    </header>
                    {cart?.map((item, index) => (
                        <div key={item?.documentId || index} className="mt-8">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <img
                                        src={item?.product?.image.url}
                                        alt=""
                                        className="size-16 rounded object-cover"
                                    />
                                    <div>
                                        <h3 className="text-sm text-gray-900">{item?.product?.title}</h3>
                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Category:</dt>
                                                <dd className="inline">{item?.product?.category}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <div>
                                            <dd className="inline">{item?.product?.price}</dd>
                                        </div>
                                        <button className="text-gray-600 transition hover:text-red-600" onClick={() => deleteCartItemFromList(item?.documentId)}>
                                            <span className="sr-only">Remove item</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ))}
                    <div className="mt-8 flex border-t border-gray-100 pt-8">
                        <div className="w-full max-w-screen space-y-4 justify-end">
                            <div className="flex justify-between !text-base font-medium">
                                <h2>Total</h2>
                                <dd>{getTotalAmount()}</dd>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={()=> router.push(`/checkout?amount=${getTotalAmount()}`)}
                                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 className='text-gray-900 text-4'>Note :All Items will be sent via Email</h2>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Cart
