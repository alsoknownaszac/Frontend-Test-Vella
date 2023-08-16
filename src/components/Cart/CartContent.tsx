import React from "react";
import { BiMinus as Minus, BiPlus as Plus } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  incrementProductQuantity,
  decrementProductQuantity,
} from "../../features/cart/cartSlice";
import ProductDetails from "../ProductDetails/ProductDetails";

export interface IElementJSXArrayState {
  id?: string | any;
  category?: string;
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

interface ICartContent {
  idx?: string | number;
  lgCart?: string | boolean;
  lgTextTransform?: string | boolean;
  lgDetails?: string | boolean;
  productData: IElementJSXArrayState;
}

export default function CartContent(props: ICartContent) {
  const { lgCart, lgTextTransform } = props;

  const { id, title, description, image, quantity, price, rating } =
    props.productData;

  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className={`${
          lgCart ? "border-t border-[#e5e5e5]" : ""
        } py-[24px] px-0 flex flex-col sm:flex-row justify-between items-start h-fit text-black`}
      >
        <ProductDetails
          isCart
          lgCart={lgCart}
          lgTextTransform={lgTextTransform}
          nameFontStyle={lgCart ? "30px" : "16px"}
          nameWeightStyle={lgCart ? "600" : "400"}
          labelFontStyle={lgCart ? "18px" : "14px"}
          sizeFontStyle={lgCart ? "18px" : "14px"}
          priceFontStyle={lgCart ? "24px" : "16px"}
          productId={id}
          productTitle={title}
          productDescription={description}
          productRating={rating}
          price={price}
        />
        <div className={`flex ${lgCart ? "h-[288px]" : "h-[190px]"}`}>
          <div
            className={`h-full grid flex-col content-between ${
              lgCart ? "text-[24px] mr-[24px]" : "text-[16px] mr-[8px]"
            }`}
          >
            <div
              onClick={() => dispatch(incrementProductQuantity(id))}
              className={`change-quantity-btn ${
                lgCart ? "text-[18px] p-[12px]" : "text-[14px] p-[4px]"
              } border border-[#1d1f22] leading-0 cursor-pointer hover:bg-[#1d1f22] focus:bg-[#1d1f22] hover:text-white focus:text-white`}
            >
              <Plus />
            </div>
            <div className="cart-quantity m-auto font-medium">{quantity}</div>
            <div
              // function from cart reducer to decrement the added product quantity
              onClick={() => dispatch(decrementProductQuantity(id))}
              className={`change-quantity-btn ${
                lgCart ? "text-[18px] p-[12px]" : "text-[14px] p-[4px]"
              } border border-[#1d1f22] leading-0 cursor-pointer hover:bg-[#1d1f22] focus:bg-[#1d1f22] hover:text-white focus:text-white`}
            >
              <Minus />
            </div>
          </div>
          <div
            className={`cart-images-container relative h-fit ${
              lgCart ? "w-[200px]" : "w-[121px]"
            }`}
          >
            <img
              src={image}
              alt="cart-images"
              className="cart-images relative w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
