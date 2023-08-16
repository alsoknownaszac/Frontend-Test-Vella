import React from "react";
import {
  addToCart,
  incrementProductQuantity,
} from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProductDetails from "./ProductDetails";
import "./singleProduct.css";

interface IProductCard {
  productData?: any;
}

interface IProductObj {
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

export default function SingleProductContainer(props: IProductCard) {
  const { id, description, image, rating, price, title } = props.productData;

  const cart = useAppSelector((state) => state.cart.value);
  const dispatch = useAppDispatch();

  // product object to be added by the user to the cart
  const productObj: IProductObj = {
    id,
    description,
    image,
    rating,
    price,
    title,
    quantity: 1,
    cartPrice: price,
  };

  function HandleAddToCart() {
    let id;
    let cartIncludes = cart.some((item: any): boolean => {
      id = item.id;
      return (
        item.title === productObj.title &&
        item.description === productObj.description
      );
    });

    cartIncludes
      ? dispatch(incrementProductQuantity(id))
      : dispatch(addToCart(productObj));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-[100px]">
      <div className="product-image-container flex gap-[40px]">
        {/* main image */}
        <div className="w-fit lg:w-[610px] h-fit relative">
          <img
            src={image}
            alt={image}
            className="imgs w-full h-[inherit] relative"
          />
        </div>
      </div>
      <div className="product-details text-black w-full lg:w-[292px]">
        {/* product details passed as a component */}
        <ProductDetails
          lgCart
          lgDetails
          lgTextTransform
          nameFontStyle="30px"
          nameWeightStyle="600"
          labelFontStyle="18px"
          sizeFontStyle="18px"
          priceFontStyle="24px"
          productTitle={title}
          productDescription={description}
          productRating={rating}
          price={price}
          cartDetails
        />
        <button
          onClick={HandleAddToCart}
          className="add-to-cart-btn bg-[#5ece7b] cursor-pointer block w-full font-semibold text-base text-center text-white mb-10 px-0 py-4 border-none"
        >
          ADD TO CART
        </button>
        {/* description is displayed as html */}
        <div className="description font-normal text-base leading-[159.96%] h-[350px] overflow-y-auto">
          {description}
        </div>
      </div>
    </div>
  );
}
