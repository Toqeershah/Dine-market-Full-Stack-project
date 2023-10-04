"use client";

import { getStripePromise } from "@/lib/stripe";
//import { Product } from "@/utils/mock"

interface IProps {
    products: Product[];
}

function StripeCheckOutButton(props: IProps) {

  const handleStripeCheckOut = async () => {
    const stripe = await getStripePromise();

    const res = await fetch(`/api/stripeSession`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
      body: JSON.stringify(props.products),
    })

    const data = await res.json();

    if(data.session) {
      stripe?.redirectToCheckout({sessionId: data.session.id})
    }
  }

  return (
    <div className="py-5">
      <button className="rounded-md px-3 py-3 text-white bg-black hover:bg-green-950" onClick={handleStripeCheckOut}>
        Process to CheckOut
      </button>
    </div>
  );
}

export default StripeCheckOutButton;
  
//BY PATHAN TUTOR