import { getCartItemsDetails } from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams.get("ids");
  if (!params) {
    return NextResponse.json({ message: "Invalid search parameters" });
  }
  const ids = params.split(",");
  const data = await getCartItemsDetails(ids);
  return NextResponse.json({ products: data });
};
