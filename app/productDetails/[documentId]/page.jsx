"use client"
import ProductApi from '../../_components/_utils/ProductApi';
import BreadCrumb from '../../_components/BreadCrumb';
import ProductList from '../../_components/ProductList';
import React, { useEffect, useState } from 'react'
import ProductBanner from '../_components/ProductBanner'
import ProductInfos from '../_components/ProductInfos'
import { usePathname } from 'next/navigation';
import Ingredients from '../../_components/Ingredients'

const ProductDetails = ({ params }) => {
  // Unwrap params with React.use() to handle the promise
  const unwrappedParams = React.use(params);
  const path = usePathname()
  
  const [productDetails, setProductDetails] = useState(null); 

  const [error, setError] = useState(null);
  const [productList, setProductList] = useState([])

  useEffect(() => {
    if (unwrappedParams?.documentId) {
      console.log('params', unwrappedParams.documentId); // Logging the documentId for debugging

      getProductById_();  
    } else {
      console.error('No documentId in params');  // Handle the case where documentId is missing
      setError('Product not found');  // Display an error message
    }
  }, [unwrappedParams]);  // Re-run when unwrappedParams change
  const getProductByCategory = (product)=> {
    ProductApi.getProductByCategory(product?.category).then(res => {setProductList(res?.data?.data);
    })
  }
  const getProductById_ = () => {

    setError(null);  // Reset error state
    ProductApi.getProductById(unwrappedParams?.documentId)
      .then(res => {
        console.log('Product item:', res.data.data);
        setProductDetails(res.data.data);
        getProductByCategory(res.data.data)

      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');

      });
  };


  if (error) {
    return <div>{error}</div>;  // Show error state
  }

  return (
    <div className='px-5 md:px-28 py-28 '>
      <BreadCrumb path={path} />
      <div className='flex flex-col  lg:flex-row mt-10 items-center gap-10'>
        <ProductBanner product={productDetails} />
        <ProductInfos product={productDetails} />  {/* Pass product details to ProductInfos */}
      </div>
      <div className='mt-10 '>
      <Ingredients product={productDetails} />
      </div>

      <div>
        <h2 className='mt-24 text-xl mb-4'>Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;
