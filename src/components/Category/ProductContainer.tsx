import React from "react";
import ProductCard from "./ProductCard";

export default function ProductContainer(props: {
  productData: Array<Object | any>;
}) {
  return (
    <div className="grid sm:grid-col-1 xl:grid-cols-3 gap-x-10 gap-y-[103px] relative">
      {props.productData?.length < 1 ? (
        <div className="text-gray-500 text-2xl absolute top-[120px] transform -translate-x-1/2 left-1/2">
          Nothing to display
        </div>
      ) : (
        props.productData?.map((item) => {
          return <ProductCard key={item.id} productInfo={item} />;
        })
      )}
    </div>
  );
}
