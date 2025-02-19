import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if(itemIndex >=0 ) {
            state.cartItems[itemIndex].cartQuantity += 1;
            state.cartItems[itemIndex].totalPrice += action.payload.price;
        } else{
            const temp = {...action.payload, cartQuantity:1, totalPrice: action.payload.price};
            state.cartItems.push(temp);
        }
          state.cartTotalAmount += action.payload.price;
          state.cartTotalQuantity += 1;
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
      removeFromCart(state, action) {
          const item = state.cartItems.find((item) => item.id === action.payload);
          if (item) {
              state.cartTotalAmount -= item.totalPrice;
              state.cartTotalQuantity -= item.cartQuantity;
              state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
          }
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
      },
      increaseQuantity(state, action) {
          const item = state.cartItems.find((item) => item.id === action.payload);
          if (item) {
              item.cartQuantity += 1;
              item.totalPrice += item.price;
              state.cartTotalAmount += item.price;
              state.cartTotalQuantity += 1;
          }
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
      },
      decreaseQuantity(state, action) {
          const item = state.cartItems.find((item) => item.id === action.payload);
          if (item && item.cartQuantity > 1) {
              item.cartQuantity -= 1;
              item.totalPrice -= item.price;
              state.cartTotalAmount -= item.price;
              state.cartTotalQuantity -= 1;
          }
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
      },
      clearCart(state) {
            state.cartItems = [];
            state.cartTotalAmount = 0;
            state.cartTotalQuantity = 0;
          localStorage.removeItem("cart");
      }

  }  
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;