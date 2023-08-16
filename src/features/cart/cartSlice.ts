import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IElementArrayState {
  id?: string;
  quantity?: number;
  price?: string;
  cartPrice?: string;
  title?: string;
  description?: string;
  image?: string;
  rating?: {
    rate: string;
    count: string;
  };
}

interface ICounterState {
  value: IElementArrayState[];
}

const initialState: ICounterState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // adding a product to cart
    addToCart: (state, action: PayloadAction<IElementArrayState>) => {
      state.value.push(action.payload);
    },
    // increment the product quantity if the plus btn in cart is clicked or a product that has the same attributes selected is added to the cart
    // incrementing the prices of the product by multiplying the current quantity with the prices - an object called cartPrice is created seperate from prices to allow the correct calculation of (prices x quantity)
    incrementProductQuantity: (state, action) => {
      state.value.forEach((element: any) => {
        if (action.payload === element.id) {
          element.quantity++;
          element.cartPrice = element.price * element.quantity;
        }
      });
    },
    // decrement the product quantity if the minus btn in cart is clicked
    // decrementing the prices of the product by multiplying the current quantity with the prices - an object called cartPrice is created seperate from prices to allow the correct calculation of (prices x quantity)
    // if the product quantity is decremented to 0 then remove from cart
    decrementProductQuantity: (state, action) => {
      state.value.forEach((element: any, idx, arr) => {
        if (action.payload === element.id) {
          element.quantity--;
          element.cartPrice = element.price * element.quantity;
        }
        if (element.quantity === 0) {
          state.value = arr.filter((curr) => curr.id !== element.id);
        }
      });
    },
  },
});

const { actions, reducer } = cartSlice;

export const viewCartItems = (state: RootState) => ({
  cart: state.cart.value,
});

export const { addToCart, incrementProductQuantity, decrementProductQuantity } =
  actions;

export default reducer;
