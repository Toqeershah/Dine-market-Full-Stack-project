import prisma from "@/lib/db";
import { getCartItemsDetails } from "@/lib/products";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const POST = async (req: NextRequest) => {
  const userSession = getAuth(req);

  const { userId, user } = userSession;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const cart = await prisma.cart.findFirst({ where: { userId } }).items();

    if (!cart) {
      return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (cart.length === 0) {
      return new NextResponse(JSON.stringify({ error: "Cart is empty" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const cartItemsIds = cart.map((item) => item.productId);
    const cartItemsDetails = await getCartItemsDetails(cartItemsIds);

    const lineItems = cart.map((item) => {
      const product = cartItemsDetails.find(
        (prod) => prod.slug.current === item.productId
      );
      if (product) {
        const productPrice = product.price;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              images: [ product.image],
              metadata: {
                productId: product.slug.current,
                image: product.image,
              },
            },
            unit_amount: (productPrice * 100).toFixed(0),
          },
          quantity: item.quantity,
        };
      }
      return null;
    });

    const filteredLineItems: any = lineItems.filter((item) => item != null);

    const origin = process.env.NEXT_PUBLIC_URL!;
    const session = await stripe.checkout.sessions.create({
      // customer_email: user?.emailAddresses[0].emailAddress,
      client_reference_id: cart[0].cartId,
      currency: "usd",
      mode: "payment",
      expand: ["line_items"],
      line_items: filteredLineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "PK"],
      },
      success_url: origin + "/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origin + "/cart",
    });

    const newOrder = await prisma.order.create({
      data: {
        status: session.status || "pending",
        userId,
        session_id: session.id,
        items: {
          createMany: {
            data: cart.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart[0].cartId },
    });

    return new NextResponse(
      JSON.stringify({ id: session.id, sessionUrl: session.url }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error, "error");
    return new NextResponse(
      JSON.stringify({
        error: (error as Error).message || "Something went wrong!",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const userSession = getAuth(req);

  const { userId } = userSession;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });

    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error, "error");
    return new NextResponse(
      JSON.stringify({
        error: (error as Error).message || "Something went wrong!",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
