import { client } from "@/sanityLib/sanityClient";

const fetchProducts = async (): Promise<Product[]> => {
  const products = await client.fetch(`*[_type == 'product'] {
    title,
    slug,
    price,
    'category': category->title,
    'image': image.asset->url 
  }`);
  return products;
};

const fetchProductById = async (slug: string): Promise<Product> => {
  const product = await client.fetch(
    `
  *[_type == 'product' && slug.current == $slug][0] {
    title,
    slug,
    price,
    'category': category->title,
    'image': image.asset->url 
  }
  `,
    { slug }
  );

  return product;
};

const getCartItemsDetails = async (ids: string[]) => {
  const products = await fetchProducts();
  const cartItemsDetails = products.filter((prod) =>
    ids.includes(prod.slug.current)
  );
  console.log(cartItemsDetails)
  return cartItemsDetails;
};

export { fetchProducts, fetchProductById, getCartItemsDetails };
