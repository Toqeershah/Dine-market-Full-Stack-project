import React from 'react'
import ProductCard from '@/components/productCard'

interface Props {
  products: Product[];
}

function ProductList({products}: Props) {

  return (
    <div className='flex flex-wrap justify-evenly py-6'>
      {
        products.map((product) => (
          <ProductCard
          key={product.slug.current}
          {...product}
          />
        ))
      }
    </div>
  )
}

export default ProductList;



// ye wali image rehti hyy

// img={product.image as StaticImageData}