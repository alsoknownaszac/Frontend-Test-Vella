import React, { useRef, useEffect, useState } from "react";
import {
  addToCart,
  incrementProductQuantity,
} from "../../features/cart/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { PiDotOutlineBold } from "react-icons/pi";

interface IProductCard {
  productInfo?: any;
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

export default function ProductCard(props: IProductCard) {
  const { id, category, description, image, rating, price, title } =
    props.productInfo;

  const cart = useAppSelector((state) => state.cart.value);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef() as React.LegacyRef<HTMLDivElement> | any;

  // function to toggle the add-to-cart button to display or not
  const handleHoverOnProductCard = (event: { target: any }) => {
    if (wrapperRef && wrapperRef.current?.contains(event.target)) {
      setOpen(true);
    } else setOpen(false);
  };

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

  //function to add a product to the cart
  // product with same attributes stack in the cart, otherwise a product with different attributes appears as separate cart items.

  function HandleAddToCart() {
    let id;
    let cartIncludes = cart.some((item: any) => {
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

  useEffect(() => {
    // display add to cart button on hover of the product card
    document.addEventListener("mouseover", handleHoverOnProductCard);
    return () => {
      // remove add to cart button on hover of the product card
      document.removeEventListener("mouseover", handleHoverOnProductCard);
    };
  }, [wrapperRef]);

  return (
    <div
      className="relative p-4 hover:shadow-[0px_4px_35px_rgba(168,172,176,0.39)] focus:shadow-[0px_4px_35px_rgba(168,172,176,0.39)]"
      ref={wrapperRef}
    >
      {/* link to a specific product details page */}
      <Link
        className="relative text-[#1d1f22] no-underline cursor-pointer h-fit"
        to={`/store/${category}/${id}`}
      >
        <div className={`relative w-full h-[330px] overflow-hidden mb-6`}>
          <img
            src={image}
            alt={title}
            className="relative w-full h-full object-contain"
          />
        </div>
        {/* if product is out of stock then display an out of stock overlay */}
        <div className={`text-lg leading-[160%] font-light `}>
          {title}
          <div className="my-2 flex items-center">
            <FaStar /> <span className="pl-2">{rating.rate}</span>{" "}
            <PiDotOutlineBold className="mx-1" size={15} />
            <span className=" font-normal text-[15px]">
              {rating.count} sold
            </span>
          </div>
          <div className="amount font-semibold">$ {price}</div>
        </div>
      </Link>
      {/* if product is out of stock then prevent the add-to-cart btn from showing otherwise display btn on hover */}
      {open && (
        <button
          className="bg-[#5ece7b] z-10 absolute w-[52px] h-[52px] flex items-center justify-center cursor-pointer rounded-[50%] border-[none] right-[28px] bottom-[125px] drop-shadow-[0px_4px_11px_rgba(29,_31,_34,_0.1)]"
          onClick={HandleAddToCart}
        >
          <FiShoppingCart size={23} />
        </button>
      )}
    </div>
  );
}
