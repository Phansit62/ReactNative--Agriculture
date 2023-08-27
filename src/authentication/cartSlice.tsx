import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

interface Product {
  productId: number;
  image: string;
  productNmae: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.productId === newItem.productId);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      AsyncStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      AsyncStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, type } = action.payload;
      const itemToUpdate = state.items.find((item) => item.productId === productId);
      if (itemToUpdate) {
        if (type === 1) {
          itemToUpdate.quantity += quantity;
        } else {
          itemToUpdate.quantity -= quantity;
        }
      }
      AsyncStorage.setItem("cart", JSON.stringify(state.items));
      
    },
    clearCart: (state) => {
      state.items = [];
      AsyncStorage.removeItem("cart");
    },
    loadCartStorage: (state, action) => {
      const savedCart = action.payload;
      state.items = savedCart || []; // Initialize cart state with the saved cart data from AsyncStorage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartStorage } = cartSlice.actions;

export default cartSlice.reducer;
