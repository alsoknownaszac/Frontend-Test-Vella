import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import BasicModal from "../Basic/BasicModal";
import CartContent from "../Cart/CartContent";
import { useCartSumUp } from "../../utility/useCartSumUp";
import { EmptyCartState } from "../Cart/EmptyCartState";
import ErrorHandling from "../Container/ErrorHandling";
import useFetch from "react-fetch-hook";
import { useAppSelector } from "../../app/hooks";
import { Link, useLocation } from "react-router-dom";
import CartSummary from "../Cart/CartSummary";
import { CgDetailsMore } from "react-icons/cg";

// cart modal btn that displays the number of products added to the cart

interface ICart {
  cartItems: React.ReactNode;
}

// cart modal btn that displays the number of products added to the cart
const Cart = ({ cartItems }: ICart) => {
  return (
    <div className="relative">
      <FiShoppingCart className="relative text-black" size={20} />
      <div className="absolute top-[-40%] z-[1] w-5 h-5 text-center font-bold text-sm leading-5 text-white bg-slate-900 rounded-[60px] -right-2/4 select-none">
        {cartItems}
      </div>
    </div>
  );
};

export function Nav() {
  const { isLoading, error, data } = (useFetch as any)(
    "https://fakestoreapi.com/products/categories"
  );

  const location = useLocation();

  const cart = useAppSelector((state) => state.cart.value);

  // calculates the total amount product on cart
  let numberOfCartItem = cart.reduce((acc, curVal: any) => {
    return acc + curVal.quantity;
  }, 0);

  // page url to toggle btw categories
  const pageUrl = location.pathname.split("/")[2];

  // calculates the sub total prices of all products added
  const sum = useCartSumUp(cart);

  return (
    <div className="fixed bg-white border-b text-black left-0 right-0 z-[5]">
      <div className="m-auto h-20 flex items-center justify-between w-full relative container">
        {isLoading ? (
          <ErrorHandling>Loading...</ErrorHandling>
        ) : error ? (
          <ErrorHandling>Something went wrong: {error}</ErrorHandling>
        ) : (
          <div className="flex justify-between p-0 gap-2 text-sm uppercase font-semibold">
            <Link
              className={`text-[#1d1f22] no-underline cursor-pointer items-center h-fit px-2 ${
                "all" === location.pathname.split("/")[1]
                  ? " text-[#5ece7b]"
                  : ""
              }`}
              to={`/all`}
            >
              All
            </Link>
            {data?.map((item: string) => {
              return (
                <Link
                  className={`text-[#1d1f22] no-underline cursor-pointer hidden lg:flex items-center h-fit px-2 ${
                    item === pageUrl ? " text-[#5ece7b]" : ""
                  }`}
                  to={`/store/${item}`}
                  key={item}
                >
                  {item}
                </Link>
              );
            })}
            <div className="flex lg:hidden">
              <BasicModal
                containerStyles="z-20"
                styles="w-full lg:w-[325px] lg:right-[72px]"
                btn={<CgDetailsMore size={23} />}
              >
                {data?.map((item: string) => {
                  return (
                    <Link
                      className={`text-[#1d1f22] no-underline cursor-pointer flex items-center h-fit px-2 mb-8 ${
                        item === pageUrl ? " text-[#5ece7b]" : ""
                      }`}
                      to={`/store/${item}`}
                      key={item}
                    >
                      {item}
                    </Link>
                  );
                })}
              </BasicModal>
            </div>
          </div>
        )}
        <div className="flex items-center">
          <BasicModal
            styles="w-full md:w-[325px] md:right-[72px]"
            btn={<Cart cartItems={numberOfCartItem} />}
          >
            <div className="text-base mb-8">
              <span className="font-bold">My Bag, </span>
              {numberOfCartItem} items
            </div>
            {/* empty state */}
            {numberOfCartItem < 1 && <EmptyCartState />}
            {/* displays the cart collection */}
            {cart.map((item) => (
              <CartContent key={item.id} productData={item} />
            ))}
            {/* the total amount and the mini-cart and cart page btn passed as a component */}
            <CartSummary
              cart={cart}
              totalCartAmount={sum}
              numberOfCartItem={numberOfCartItem}
            />
          </BasicModal>
        </div>
      </div>
    </div>
  );
}
