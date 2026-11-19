import React from 'react'
import ProductHeader from '../components/ProductHeader'
import ProductList from '../components/ProductList'

const Product = () => {
  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6' >
        <ProductHeader />
        <ProductList />
    </div>
  )
}

export default Product