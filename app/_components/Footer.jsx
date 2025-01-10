import React from 'react'
// import { useUser  } from '@clerk/nextjs'
import Image from 'next/image'
const Footer = () => {
  // const {user} = useUser
  return (
    <>
    <div className='flex flex-col justify-center items-center my-28 w-60 h-96 opacity-90 m-auto'>
                <Image src="/logo.svg" alt="logo" width={1000} height={1000} />

                <h2 className='mt-5'>contact us on 555237698</h2> 
      
    </div>

    </>
  )
}

export default Footer