import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroImage from "/public/hero.webp";
import Image from "next/image";
import Featured1 from "/public/images/Featured1.png";
import Featured2 from "/public/images/Featured2.png";
import Featured3 from "/public/images/Featured3.png";
import Featured4 from "/public/images/Featured4.png";
import promo1 from "/public/images/promo1.jpg";
import promo2 from "/public/images/promo2.jpg";
import Link from "next/link";

function Hero() {
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-y-10 py-6">
        <div className="flex-1 ml-16">
          <Badge className="py-3 px-6 rounded-[10px] bg-blue-200 text-blue-700">
            Sale 70%
          </Badge>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">
            An Industrial<br></br>Take on<br></br>StreetWear
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-11">
            The king, seeing how much happier his subjects were,<br></br>
            realized the error of his ways and repealed the joke tax.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-11">
            In the Store, seeing how much products were attractive,<br></br>
            realized the prices of these products and repealed next.
          </p>
          <Link href={"/products"}>
            <Button className="bg-black hover:bg-green-950 h-12 px-8 mt-8 text-white rounded-[20px]">
              Start Shopping
            </Button>
          </Link>
          <div className="flex items-center gap-x-6 mt-14">
            <Image src={Featured1} alt="" />
            <Image src={Featured2} alt="" />
            <Image src={Featured3} alt="" />
            <Image src={Featured4} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <Image src={heroImage} alt="heroimage" />
        </div>
      </section>
      {/* promotion section */}
      <section>
        <div className="mt-16 ml-[550px]">
          <Badge className="py-3 px-12 rounded-[10px] bg-blue-200 text-blue-700 justify-items-center">
            PROMOTIONS
          </Badge>
        </div>
        <div className="mt-8 ml-[450px]">
          <h2 className="text-4xl font-bold">Our Promotions Events</h2>
        </div>
        <div className="flex gap-x-14 mt-8 pl-24">
          <Image src={promo1} alt="promo1" width={500} height={400} />
          <Image src={promo2} alt="promo2" width={500} height={400} />
        </div>
        <div className="pt-16 ml-[550px] mt-10">
          <Badge className="py-3 px-8 rounded-[10px] bg-blue-200 text-blue-700">
            PRODUCTS
          </Badge>
        </div>
        <div className="mt-6 ml-[450px]">
          <h2 className="text-4xl font-bold">Check What We Have</h2>
        </div>
      </section>
    </>
  );
}

export default Hero;
