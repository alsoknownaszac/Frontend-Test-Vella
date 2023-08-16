import React from "react";
import { Nav } from "../Naviagtion/Nav";

interface ILayout {
  children: React.ReactNode;
  titleSize?: React.CSSProperties | string;
  titleMb?: React.CSSProperties | string;
  pageTitle?: string;
}

export default function Layout(props: ILayout) {
  return (
    <div className="relative w-screen h-screen ">
      <Nav />
      <div className="h-full bg-white pt-20 overflow-y-auto overflow-x-hidden">
        <div className="pt-20 pb-24 m-auto w-full container">
          <div
            className={`uppercase font-medium text-[${props.titleSize}] mb-[${props.titleMb}] text-gray-900 leading-[160%]`}
          >
            {props.pageTitle}
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
