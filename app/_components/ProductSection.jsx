"use client";
import React, { useEffect, useState } from 'react';
import ProductApi from './_utils/ProductApi';
import ProductList from './ProductList';

const ProductSection = () => {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        getLatestProducts_();
    }, []);

    const getLatestProducts_ = () => {
        ProductApi.getLatestProducts().then(res => {   
            setProductList(res.data.data)
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    };

    return (
        <div className='px-10 md:px-20 mt-28'>
           <ProductList productList={productList} />
        </div>
    );
};

export default ProductSection;
