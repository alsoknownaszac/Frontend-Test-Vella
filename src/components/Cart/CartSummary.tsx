import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { storeCartSum } from "../../features/checkout/checkoutSlice";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { IElementJSXArrayState } from "./CartContent";

interface ICartSummary {
  lgCart?: string | boolean;
  totalCartAmount?: number | any;
  numberOfCartItem?: number | any;
  cart?: IElementJSXArrayState[];
}

export default function CartSummary(props: ICartSummary) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // const cartTotalSum = useAppSelector((state) => state.checkout.cartTotalSum);
  const dispatch = useAppDispatch();

  const { lgCart, totalCartAmount, numberOfCartItem } = props;

  // tax percentage
  const percent = 10;

  //tax
  let lgCartTax: any;
  // total = mini-cart subtotal + tax
  let lgCartSum: any;

  // calculates the tax from the mini cart subtotal and the total after adding the tax
  if (totalCartAmount) {
    lgCartTax = totalCartAmount * (percent / 100);
    lgCartSum = (Number(totalCartAmount) + lgCartTax).toFixed(2);
  }

  const AddToErrorMessage = () => {
    if (numberOfCartItem === 0) {
      enqueueSnackbar(" add to cart to proceed", {
        variant: "error",
      });
    } else {
      dispatch(storeCartSum(lgCartSum));
      history.push("/checkout");
    }
  };

  return (
    <div
      className={`${lgCart ? "mt-[35px] w-[279px]" : "mt-[32px]"} text-black`}
    >
      {/* if the url is cart page and there is a product added to cart*/}
      {numberOfCartItem > 0 && (
        <div
          className={`cart-summary flex items-center  ${
            lgCart ? "text-[28px]" : "text-[16px]"
          } cs-mb mb-2`}
        >
          <div className="title ">Tax {percent}%:</div>
          <div className={`amount font-bold ${lgCart ? "ml-4" : "ml-auto"}`}>
            $ {lgCartTax.toFixed(2)}
          </div>
        </div>
      )}
      {/* if the url is cart page */}
      {lgCart && (
        <div
          className={`cart-summary flex items-center  ${
            lgCart ? "text-[28px]" : "text-[16px]"
          } cs-mb mb-2`}
        >
          <div className="title">Quantity:</div>
          <div className={`amount font-bold ${lgCart ? "ml-4" : "ml-auto"}`}>
            {numberOfCartItem}
          </div>
        </div>
      )}

      <div
        className={`cart-summary flex items-center ${
          lgCart ? "text-[32px] mb-[20px]" : "text-[16px] mb-[32px]"
        } cs-mb `}
      >
        <div className="title w-[104px] font-semibold">Total:</div>
        <div className={`amount font-bold ${lgCart ? "ml-0" : "ml-auto"}`}>
          $ {lgCartSum}
        </div>
      </div>
      {/* if the url is cart page otherwise it should be mini-cart */}
      {lgCart ? (
        <button onClick={AddToErrorMessage}>
          <div className="w-[200px] cursor-pointer font-semibold text-sm text-white text-center px-0 py-[13px] border-none bg-[#5ece7b] disabled:cursor-not-allowed disabled:opacity-70">
            ORDER
          </div>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 font-semibold text-sm">
          <Link
            className="cursor-pointer border text-center text-[#1d1f22] no-underline px-0 py-[13px] border-solid border-[#1d1f22] hover:text-white hover:bg-[#1d1f22]"
            to="/cart"
          >
            <button disabled={numberOfCartItem === 0}>VIEW BAG</button>
          </Link>
          <div onClick={AddToErrorMessage}>
            <div className="cursor-pointer w-full text-white text-center px-0 py-[13px] border-none bg-[#5ece7b] disabled:cursor-not-allowed disabled:opacity-70">
              CHECKOUT
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
