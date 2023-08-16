import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ICheckoutState {
  cartTotalSum: string;
  checkoutData: { userInfo: Object | null; checkoutCart: Array<Object> };
}

const initialState: ICheckoutState = {
  cartTotalSum: "",
  checkoutData: { userInfo: {}, checkoutCart: [] },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // storing the total amount of the cart sum
    storeCartSum: (state, action: PayloadAction<string>) => {
      state.cartTotalSum = action.payload;
    },
    // storing the user personal Information
    storeUserInfo: (state, action: PayloadAction<Object | null>) => {
      state.checkoutData.userInfo = action.payload;
    },
    // storing the cart items
    storeCheckoutCart: (state, action: PayloadAction<Object[]>) => {
      state.checkoutData.checkoutCart = action.payload;
    },
  },
});

const { actions, reducer } = checkoutSlice;

export const viewCheckout = (state: RootState) => ({
  cartTotalSum: state.checkout.cartTotalSum,
  checkoutData: state.checkout.checkoutData,
});

export const { storeCartSum, storeUserInfo, storeCheckoutCart } = actions;

export default reducer;
