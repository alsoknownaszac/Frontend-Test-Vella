import React from "react";
import { FaStar } from "react-icons/fa";
// import { useAppSelector, useAppDispatch } from "../../app/hooks";

interface IProductDetails {
  productId?: string | number;
  productTitle?: string;
  productDescription?: string;
  productRating?:
    | {
        rate: string;
        count: string;
      }
    | any;
  price?: string | number;
  isCart?: string | boolean;
  cartDetails?: string | boolean;
  lgCart?: string | boolean;
  lgDetails?: string | boolean;
  lgTextTransform?: string | boolean;
  nameFontStyle?: string | boolean;
  nameWeightStyle?: string | boolean;
  labelFontStyle?: string | boolean;
  priceFontStyle?: string | boolean;
  sizeFontStyle?: string | boolean;
}

export default function ProductDetails(
  props: IProductDetails
): React.ReactNode {
  const {
    productTitle,
    productDescription,
    productRating,
    price,
    isCart,
    cartDetails,
    lgCart,
    lgDetails,
    lgTextTransform,
    nameFontStyle,
    nameWeightStyle,
    labelFontStyle,
    priceFontStyle,
    sizeFontStyle,
  } = props;

  return (
    <div>
      <div
        className={`text-[${nameFontStyle}] ${
          lgDetails ? "mb-[43px]" : lgCart ? "mb-[20px]" : "mb-[10px]"
        }`}
      >
        <div
          className={` ${!lgCart ? "mb-[10px]" : "text-xl mb-[16px]"} font-[${
            nameWeightStyle || 400
          }]`}
        >
          {productTitle}
        </div>
        <div className="my-2 flex items-center text-lg">
          <FaStar /> <span className="pl-2">{productRating.rate}</span>
        </div>
      </div>
      {/* display the price here if the url is the cart page or mini cart */}
      {!cartDetails && (
        <div
          className={
            lgDetails ? "mb-[30px]" : lgCart ? "mb-[20px]" : "mb-[10px]"
          }
        >
          <div
            className={`${
              !lgCart ? "font-[400]" : "font-[700]"
            } text-[${labelFontStyle}] ${
              lgTextTransform ? "uppercase" : "capitalize"
            } leading-4 mb-2 text-[#1d1f22]`}
          >
            Price
          </div>
          <div
            className={`${
              !lgCart ? "font-[500]" : "font-[700]"
            } text-[${priceFontStyle}] price`}
          >
            $ {price}
          </div>
        </div>
      )}

      {/* display the price here if the url is the product description page */}
      {cartDetails && (
        <div
          className={
            lgDetails ? "mb-[30px]" : lgCart ? "mb-[20px]" : "mb-[10px]"
          }
        >
          <div
            className={`${
              !lgCart ? "font-[400]" : "font-[700]"
            } text-[${labelFontStyle}] ${
              lgTextTransform ? "uppercase" : "capitalize"
            } leading-4 mb-2 text-[#1d1f22]`}
          >
            Price
          </div>
          <div
            className={`${
              !lgCart ? "font-[500]" : "font-[700]"
            } text-[${priceFontStyle}] price`}
          >
            $ {price}
          </div>
        </div>
      )}
    </div>
  );
}
