import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../_context/CartContext';
import CartApi from './_utils/CartApi';
import Cart from './Cart'

const Header = () => {
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false)
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user]);

  const getCartItems = () => {
    CartApi.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res => {
      console.log('response cartItems', res.data.data);
      res.data.data.forEach(citem => {
        setCart(oldCart => [
          ...oldCart,
          {
            documentId: citem.documentId,
            product: citem?.products[0],
          }
        ]);
      });
    });
  };

  // Hydration fix - ensuring this only runs on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true only on the client side
  }, []);

  if (!isClient) {
    return null; // Render nothing during SSR, prevent hydration mismatch
  }

  return (
    <header className="bg-white shadow w-screen">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li><a className="text-gray-500 transition hover:text-gray-500/75" href="/">Home</a></li>
              <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Explore</a></li>
              <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Products</a></li>
              <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">About Us</a></li>
              <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Projects</a></li>
              <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Contact Us</a></li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <SignInButton>
                  <button className="block rounded-md bg-buttons px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-700">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <div className='flex items-center gap-5'>
                <h2 className='flex items-center cursor-pointer'><ShoppingCart onClick={()=>setOpenCart(!openCart)}/> ({cart ? cart?.length : 0})</h2>
                <UserButton afterSignOutUrl='/'/>
                {openCart && <Cart />}
              </div>
            )}

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
