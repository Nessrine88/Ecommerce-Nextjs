import React from 'react'

const SkeletonProduct = () => {
  return (
    <div>
        <h2 className='text-[20px] h-10 w-[150px] bg-slate-200 rounded-lg animate-pulse'>
        </h2>
        <h2 className='text-[15px] text-primary h-10 w-[250px] bg-slate-200 rounded-lg animate-pulse mt-5'>
        </h2>
        <h2 className='text-[15px] text-primary line-clamp-1 h-40 w-[250px] bg-slate-200 rounded-lg animate-pulse  mt-5'>
        </h2>
            <h2 className='text-[11px] text-gray-900 flex items-center gap-1 mt-5 h-10 w-[250px] bg-slate-200 rounded-lg animate-pulse'>
       
            </h2>

        <h2 className='text-[22px] text-primary mt-5 line-clamp-1 h-10 w-[250px] bg-slate-200 rounded-lg animate-pulse'>
        <button className='flex items-center gap-3  px-10 py-2  h-10 w-[250px] bg-slate-200 rounded-lg animate-pulse'></button>
        </h2>

    </div>
  )
}

export default SkeletonProduct
