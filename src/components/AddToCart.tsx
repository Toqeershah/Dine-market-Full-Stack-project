"use client";
import { Button } from "./ui/button";
import useAddToCart from "@/hooks/cart";

const AddToCart = ({ id }: { id: string }) => {
  const {loading, handleAddToCart} = useAddToCart()

  return <Button disabled={loading} className="bg-black text-white" onClick={() => handleAddToCart(id, 1)}>Add to Cart</Button>;
};
export default AddToCart;
