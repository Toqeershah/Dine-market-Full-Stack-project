import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartState {
  items: { id: string; quantity: number }[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(
      state,
      action: PayloadAction<{
        items: any;
        totalQty: number;
      }>
    ) {
      const { items, totalQty } = action.payload;
      state.totalQuantity = totalQty;
      state.items = items;
    },
    addToCart(
      state: CartState,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.quantity += quantity;
      } else {
        state.items.push({ id: productId, quantity });
      }
      state.totalQuantity += quantity;
    },

    removeFromCart(state: CartState, action: PayloadAction<string>) {

    },
    clearCart(state) {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart, removeFromCart, setCart } =
  cartSlice.actions;

export const getTotalQuantity = createSelector(
  (state: RootState) => state.cart.totalQuantity,
  (totalQuantity) => totalQuantity
);

export default cartSlice.reducer;
