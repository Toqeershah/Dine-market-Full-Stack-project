import ProductCard from "@/components/productCard";
import { client } from "@/sanityLib/sanityClient";
import { notFound } from "next/navigation";


// export const revalidate = 600; // isr (incremental static regeneration)
// export const dynamic = 'auto[default]|force-dynamic|force-static'

const getProductsByCategory = async (category: string) => {
  return client.fetch(`
      *[_type == 'product' && category->slug.current == $slug] {
        title,
        slug,
        price,
        'category': category->title,
        'image': image.asset->url 
      }
    
  `,
    {
      slug: category,
    }
  );
};

export default async function Page({ params }: { params: { slug: string } }) {
  const products: Product[] = await getProductsByCategory(params.slug);

  if (!products || products.length === 0) return notFound();

  return (
    <div className="flex  mt-16 py-10 justify-evenly flex-wrap">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.slug.current} {...product} />)
      ) : (
        <p className="text-xl font-semibold pb-16 pt-6 text-sky-800">
          No Products Found
        </p>
      )}
    </div>
  );
}
