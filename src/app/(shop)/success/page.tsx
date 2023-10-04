import React from "react";
//import { Button } from "../../components/ui/button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function successMessage() {
  return (
    <div className="text-center">
      <h1 className="items-center text-4xl font-bold text-green-800 pt-16 pb-5">
        Congratulations!
      </h1>
      <h2 className="items-center  text-2xl font-semibold text-sky-900">
        Your Product has been successfully placed.
      </h2>
      <p className="mt-4 text-fuchsia-900 font-semibold">Your Product is on the way. Keep Checking for live Status.</p>
      <div className="text-start">
        <Link href={"/"}>
          <Button className="bg-black hover:bg-green-950 text-white rounded-xl mt-12 mb-4 ml-6">
            Back To Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default successMessage;
