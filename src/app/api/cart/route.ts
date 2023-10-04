import { fetchProductById } from "@/lib/products";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

/* 
  Cart API
  - POST: Add to cart
  - GET: Get cart items
  - DELETE: Remove from cart
  - PUT: Update cart item quantity

  - POST
    Data: { productId, quantity }
    - Check if user is logged in
    - Check if product exists
    - Check if product is already in cart
    - If not, create a new cart item
    - If yes, update the quantity
  - GET
    - Check if user is logged in
    - Get cart items
  - DELETE
    Data: with query params: productId
    - Check if user is logged in
    - Check if product exists
    - Check if product is in cart
    - If yes, delete the cart item
  - PUT
    Data: { productId, type: "inc" | "dec" // increment or decrement}
    - Check if user is logged in
    - Check if product exists
    - Check if product is in cart
    - If yes, update the quantity
*/

export const POST = async (req: NextRequest) => {
  const session = getAuth(req);

  const { userId } = session;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Add to cart logic here

  const data = await req.json();
  const { productId, quantity } = data;

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: "Invalid " }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const prod = await fetchProductById(productId);

  if (!prod) {
    return new NextResponse(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const qty = quantity || 1;
  const prodId = productId.toString();

  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
  });

  if (!cart) {
    await prisma.cart.create({
      data: {
        userId,
        items: {
          create: {
            productId: prodId,
            quantity: qty,
          },
        },
      },
    });
  } else {
    const cartProduct = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: {
          where: {
            productId: prodId,
          },
        },
      },
    });

    if (!cartProduct || cartProduct.items.length === 0) {
      await prisma.cartItem.create({
        data: {
          cart: {
            connect: {
              id: cart.id,
            },
          },
          productId: prodId,
          quantity: qty,
        },
      });
    } else {
      const cartProdId = cartProduct.items[0].id;
      const prevQty = cartProduct.items[0].quantity;

      if (prevQty + qty < 1) {
        return new NextResponse(
          JSON.stringify({ error: "Min quantity can be 1" }),
          {
            status: 422,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      await prisma.cartItem.update({
        where: {
          id: cartProdId,
        },
        data: {
          quantity: prevQty + qty,
        },
      });
    }
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Getting Cart Items
export const GET = async (req: NextRequest) => {
  const session = getAuth(req);

  const { userId } = session;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });

  return new NextResponse(JSON.stringify({ items: cart ? cart.items : [] }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE = async (req: NextRequest) => {
  const session = getAuth(req);

  const { userId } = session;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const url = new URL(req.nextUrl);
  const productId = url.searchParams.get("productId");

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: "Product ID is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: {
        where: {
          productId,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProdId = cart.items[0].id;

  await prisma.cartItem.delete({
    where: {
      id: cartProdId,
    },
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT = async (req: NextRequest) => {
  const session = getAuth(req);

  const { userId } = session;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const data = await req.json();
  const { productId, type } = data;

  if (!productId || !type) {
    return new NextResponse(JSON.stringify({ error: "Invalid Data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const prodId = productId.toString();
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: {
        where: {
          productId: prodId,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const quantity = cart.items[0].quantity + (type === "inc" ? 1 : -1);

  if (quantity === 0) {
    const cartProdId = cart.items[0].id;

    await prisma.cartItem.delete({
      where: {
        id: cartProdId,
      },
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProdId = cart.items[0].id;

  await prisma.cartItem.update({
    where: {
      id: cartProdId,
    },
    data: {
      quantity,
    },
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
