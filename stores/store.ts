import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/authentication/authSlice";
import cartSlice from "../src/authentication/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadCartStorage } from "../src/authentication/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

AsyncStorage.getItem("cart")
  .then((cartData) => {
    const savedCart = JSON.parse(cartData || "");
    store.dispatch(loadCartStorage(savedCart));
  })
  .catch((error) => {
    console.log("Error loading cart data from AsyncStorage:", error);
  });

export type RootState = ReturnType<typeof store.getState>;
export default store;
