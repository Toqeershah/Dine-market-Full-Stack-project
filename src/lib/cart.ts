import axios from "axios";

async function getCartProducts() {
  const response = await axios.get("/api/cart");
  return response.data;
}

export { getCartProducts };
