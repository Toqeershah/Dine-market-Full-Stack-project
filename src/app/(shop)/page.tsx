import Hero from "@/views/Hero";
import ProductList from "@/views/ProductList"
import { SignUp } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import NewsLetter from "@/components/NewsLetter";
import {client} from "@/sanityLib/sanityClient";


export const getProducts = async () => {
  const res = await client.fetch(`*[_type == 'product'] | order(_createdAt asc) [0...3] {
    title,
    slug,
    price,
    'category': category->title,
    'image': image.asset->url 
  }`);
  return res;
}

interface IProduct {
  title: string,
  price: number;
  slug: {current: string}  
  category: string,
  image: string
}

export const dynamic = 'force-dynamic'

// export const revalidate = 1 //(for regeneration of page)cache the request after every one second from Next
//export const cache = "no-store"

export default async function Home() {

  const data: IProduct[] = await getProducts();

  return (
    <div>
      <Hero />
      <ProductList products={data.slice(0, 3)} />
      <SignUp />
      <NewsLetter />
    </div>
  )
}