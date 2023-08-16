import React, { useState } from "react";
import "./BasicModal.css";

export default function BasicModal(props: {
  btn: JSX.Element | string;
  children: React.ReactNode;
  styles?: string;
  containerStyles?: string;
}) {
  const [open, setOpen] = useState(false);

  const { btn, children } = props;

  const HandleCloseModal = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center">
      <div className="cursor-pointer ml-5" onClick={HandleCloseModal}>
        {btn}
      </div>
      {open && (
        <div
          className={`${props.containerStyles} fixed left-0 w-full h-full overflow-auto z-10 top-[80px] bg-[rgba(57,_55,_72,_0.22)]`}
          onClick={HandleCloseModal}
        >
          <div
            className={`${props.styles} ModalContent overflow-y-scroll relative bg-white ml-auto max-h-[500px] px-4 py-8`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
