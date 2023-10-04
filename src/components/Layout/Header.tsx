"use client";

import Image from "next/image";
import Logo from "/public/Logo.webp";
import React, { useEffect } from "react";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { getCartProducts } from "@/lib/cart";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getTotalQuantity, setCart } from "@/store/slice/cartSlice";
import { SignIn, SignUp, UserButton } from "@clerk/nextjs";
import Searchbar from "@/components/Searchbar"

type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

function Header() {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(getTotalQuantity);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const cartProducts = await getCartProducts();

        const items: CartItem[] | undefined = cartProducts.items;
        if (items && items.length > 0) {
          const cartItems = items.map((item) => ({
            id: item.productId,
            quantity: item.quantity,
          }));
          const totalQuantity = items.reduce(
            (total, item) => total + item.quantity,
            0
          );
          dispatch(setCart({ items: cartItems, totalQty: totalQuantity }));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [getCartProducts]);

  return (
    <div className="flex justify-around items-center py-6 px-8 bg-slate-400 sticky top-0">
      <Link href={"/"}>
        <Image src={Logo} alt="logo" className="w-40" />
      </Link>
      <ul className="flex gap-x-10">
        <li className="text-lg font-semibold">
          <Link href={"/category/male"}>Male</Link>
        </li>
        <li className="text-lg font-semibold">
          <Link href={"/category/female"}>Female</Link>
        </li>
        <li className="text-lg font-semibold">
          <Link href={"/category/kids"}>Kids</Link>
        </li>
        <li className="text-lg font-semibold">
          <Link href={"/category/casual"}>Casual</Link>
        </li>
        <li className="text-lg font-semibold">
          <Link href={"/products"}>All Products</Link>
        </li>
      </ul>
      {/* <div className="flex gap-2 border-black bg-white px-2 rounded-lg">
        <SearchIcon size={20} />
        <input className="w-56" type="text" placeholder="what are you looking for" />
      </div> */}
      <div>
        <Searchbar />
      </div>
      <Link href="/cart">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 relative">
          <ShoppingCartIcon />
          <span className=" flex justify-center w-5 h-5 bg-red-700 rounded-full text-white absolute bottom-7 left-8">
            {totalQuantity}
          </span>
        </div>
      </Link>
      <div><UserButton /></div>
    </div>
  );
}

export default Header;
