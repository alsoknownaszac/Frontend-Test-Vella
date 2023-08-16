import React from "react";
import Layout from "../components/Layout/Layout";
import { useCartSumUp } from "../utility/useCartSumUp";
import CartContent, {
  IElementJSXArrayState,
} from "../components/Cart/CartContent";
import { useAppSelector } from "../app/hooks";
import { EmptyCartState } from "../components/Cart/EmptyCartState";
import CartSummary from "../components/Cart/CartSummary";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.value);
  // calculates the total amount product on cart
  let numberOfCartItem = cart.reduce((acc, curVal: any) => {
    return acc + curVal.quantity;
  }, 0);

  // calculates the sub total prices of all products added
  const sum = useCartSumUp(cart);

  return (
    <Layout titleSize="32px" titleMb="55px" pageTitle="Cart">
      {/* horizonatl line */}
      <div
        className={
          numberOfCartItem > 0 ? "border-t border-t-[#e5e5e5]" : "border-none"
        }
      />
      {/* empty state */}
      {numberOfCartItem < 1 && <EmptyCartState />}
      {/* displays the cart collection */}
      {cart.map((item: IElementJSXArrayState, idx) => (
        <CartContent
          idx={idx}
          lgCart
          lgDetails
          lgTextTransform
          key={item.id + idx}
          productData={item}
        />
      ))}
      {/* the total amount and the mini-cart and cart page btn passed as a component */}
      <CartSummary
        lgCart
        cart={cart}
        totalCartAmount={sum}
        numberOfCartItem={numberOfCartItem}
      />
    </Layout>
  );
}
