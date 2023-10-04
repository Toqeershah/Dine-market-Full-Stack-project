import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
//import { Product } from "@/utils/types";

function ProductCard({ category, slug, image, title, price }: Product) {
  const id = slug.current;
  return (
    <div className="py-7">
      <Link href={`/products/${id}`}>
        <Image src={image} alt="products" width={325} height={400} />
      </Link>
      <div>
        <h3 className="font-bold text-lg mt-3 ">{title}</h3>

        <p className="font-bold text-lg">${price}</p>
        <p className="font-normal text-lg">
          Category{" "}
          <span className="text-base font-normal capitalize"> {category}</span>
        </p>

        <Button className="text-white bg-black rounded-xl text-xs mt-6" asChild>
          <Link href={`/products/${id}`}>Product Details</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
