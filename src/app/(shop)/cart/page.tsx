"use client";

import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [products, setProducts] = useState([] as any);

  async function checkoutHandler() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await res.json();
      const stripe = await stripePromise;
      stripe?.redirectToCheckout({
        sessionId: data.id
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cartItems.length < 0) return;
    const ids = cartItems.map((item) => item.id);
    const url = `/api/products?ids=${ids.join(",")}`;
    console.log(url)
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong ");
        return res.json();
      })
      .then((data) => {
        console.log(data, 'products data')
        const products = data.products;
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartItems]);

  if (!products) {
    return <h1 className="text-2xl font-bold pt-16 pb-16 mb-16 mt-8 text-center text-red-600">Your Cart is Empty</h1>;
  }

  const totalPrice = products.reduce(
    (pre: number, crr: any) => pre + crr.price,
    0
  );
  return (
    <>
      <main className="pt-10 ml-10">
        <div className="flex flex-col gap-10">
          {products.map((product: any) => (
            <div key={product.id}>
              <Image src={product.image} alt="" width={325} height={400} />
              <h3 className="mt-4">{product.title}</h3>
              <p>
                {cartItems.find((item) => item.id === product.id)?.quantity}
              </p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex max-w-sm gap-y-4 pt-8">
            <h4> Total Price: </h4>
            <p className="pl-2">{totalPrice}$</p>
          </div>
        </div>
        <div>
          <Button
            className="bg-black text-white my-8 px-3"
            onClick={checkoutHandler}
          >
            Process to Checkout
          </Button>
        </div>
      </main>
    </>
  );
};

export default CartPage;
