import React from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/store/slice/cartSlice";
import { useAppDispatch } from "@/store/hook";
import {  useSession } from "@clerk/nextjs";

function useAddToCart() {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const session = useSession();
  const isAuthenticated = session.isSignedIn;

  function handleError(error: Error | { message: string }) {
    setLoading(false);
    toast(error.message || "Something went wrong");
    console.log(error);
  }

  const handleAddToCart = async (
    productId: string,
    quantity: number | null
  ) => {
    setLoading(true);
    if (isAuthenticated) {
      fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setLoading(false);
            dispatch(
              addToCart({ productId: productId, quantity: quantity as number })
            );
            toast.success("Item added to cart Successfully");
          }
        })
        .catch((err) => {
          handleError({ message: "Your cart could not be saved." });
        });

      // add to cart
    } else {
      setLoading(false);
      toast("You need to be logged in");
    }
  };

  return {
    handleAddToCart,
    loading,
  };
}

export default useAddToCart;
