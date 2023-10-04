import React from "react";
import ProductList from "@/views/ProductList";
import { client } from "@/sanityLib/sanityClient";

export const getProducts = async () => {
  const res = await client.fetch(`*[_type == 'product'] {
    title,
    slug,
    price,
    'category': category->title,
    'image': image.asset->url 
  }`);
  return res;
}

export const revalidate = 1;

interface IProduct {
  title: string,
  price: number;
  slug: {current: string}  
  category: string,
  image: string
}

async function AllProducts() {
  const products: IProduct[] = await getProducts();
  return (
    // <div className='flex  mt-16 py-10 justify-evenly flex-wrap'>
    <ProductList products={products} />
  );
}

export default AllProducts;

// ye wali image rehti hyy
// img={product.image as StaticImageData}
