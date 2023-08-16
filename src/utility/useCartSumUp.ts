import { IElementArrayState } from "../features/cart/cartSlice";

export const useCartSumUp = (cartData: Array<IElementArrayState | any>) => {
  let cartPrices: Array<any> = [];
  cartData.forEach((item: { cartPrice: string }) =>
    cartPrices.push(item.cartPrice)
  );

  let totalCartAmount = cartPrices.reduce((acc, curVal) => {
    return acc + curVal;
  }, 0);

  return totalCartAmount.toFixed(2);
};
