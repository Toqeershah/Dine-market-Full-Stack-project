import AddToCart from "@/components/AddToCart";
import Quantity from "@/components/Quantity";
import { client } from "@/sanityLib/sanityClient";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {

  const product = await client.fetch(`
  *[_type == 'product' && slug.current == $slug][0] {
    title,
    slug,
    price,
    'category': category->title, // Reference to productCategory's title
    'image': image.asset->url // Assuming you have an 'image' field with an asset reference
  }
  `, {slug});

  return product;
}

interface Props {
  params: {
    id: string;
  };
}

const sizes = ["xs", "s", "md", "lg", "xl"];
export default async function Page({ params }: Props) {
  const productSlug = params.id;

  const product: Product = await getProduct(productSlug);

  if (!product) {
    return notFound();
  }

  const id = product.slug.current;
  return (
    <div className="flex  mt-16 py-10 flex-wrap">
      <div className="flex justify-between gap-6">
        <div>
          <Image
            src={product.image}
            width={325}
            height={400}
            alt={product.title}
          />
        </div>
        {/* Right content */}
        <div>
          <div>
            <h1 className="text-2xl">{product.title}</h1>
            {/* <h2 className="text-base font-semibold text-gray-400">
              {product.tagline}
            </h2> */}
          </div>
          <div>
            <h3 className="text-xs font-semibold mt-6">SELECT SIZE</h3>
          </div>
          {/* Sizes */}
          <div className="flex gap-x-3">
            {sizes.map((item, index) => {
              return (
                <div key={index}>
                  <div className="rounded-full w-6 h-6 bg-slate-400 hover:bg-green-400 mt-3 flex justify-center items-center">
                    <span className="text-xs font-semibold text-center text-gray-600">
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Quantity */}
          <div className="flex mt-6 items-center">
            <h3 className="text-[14px] font-semibold">Quantity:</h3>
            <Quantity />
          </div>
          <div className="mt-5">
            <AddToCart id={id } />
          </div>
        </div>
      </div>
    </div>
  );
}
