import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BiSolidLockAlt } from "react-icons/bi";
import {
  storeCheckoutCart,
  storeUserInfo,
} from "../features/checkout/checkoutSlice";

export default function Checkout() {
  const cart = useAppSelector((state) => state.cart.value);
  const cartTotalSum = useAppSelector((state) => state.checkout.cartTotalSum);
  const checkoutData = useAppSelector((state) => state.checkout.checkoutData);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<Object | any>();

  const [disabledBtn, setDisabledBtn] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Please add your name"),
    email: yup
      .string()
      .email("Input a valid email")
      .required("Please add your email"),
    address: yup.string().required("Please add your Address"),
  });

  console.log(checkoutData, userForm);

  const HandleSubmit = React.useCallback(
    async (e: any) => {
      // Prevent form from submitting:
      e.preventDefault();

      // Check the schema if form is valid:
      const isFormValid = await schema.isValid(userForm, {
        abortEarly: false, // Prevent aborting validation after first error
      });
      if (isFormValid) {
        setDisabledBtn(true);
        // If form is valid, continue submission.
        dispatch(storeUserInfo(userForm));
        dispatch(storeCheckoutCart(cart));
        enqueueSnackbar(
          <div>
            <div>Checkout Success</div>
            <div>Check Console for more info</div>
          </div>,
          {
            variant: "success",
          }
        );
        setUserForm(undefined);
        setDisabledBtn(false);
      } else {
        schema
          .validate(userForm, {
            abortEarly: false,
          })
          .catch((err) => {
            enqueueSnackbar(err.inner[0].message, {
              variant: "error",
            });
          });
      }
    },
    [userForm]
  );

  return (
    <Layout titleSize="32px" titleMb="55px" pageTitle="Guest Checkout">
      <div className="mt-6 text-black">
        <div className="gap-y-6 gap-x-4 grid-cols-12 grid ">
          <div className="col-span-full">
            <label
              htmlFor="name"
              className="text-[rgb(55_65_81_/_var(--tw-text-opacity))] font-medium text-sm leading-5 block"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                name="name"
                onChange={({ target }) =>
                  setUserForm({
                    ...userForm,
                    [target.name]: target.value,
                  })
                }
                className=" border-gray-500 py-2 px-4 bg-white border-2 text-sm leading-5 rounded-md w-full block"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="email"
              className="text-[rgb(55_65_81_/_var(--tw-text-opacity))] font-medium text-sm leading-5 block"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                onChange={({ target }) =>
                  setUserForm({
                    ...userForm,
                    [target.name]: target.value,
                  })
                }
                className=" border-gray-500 py-2 px-4 bg-white border-2 text-sm leading-5 rounded-md w-full block"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="address"
              className="text-[rgb(55_65_81_/_var(--tw-text-opacity))] font-medium text-sm leading-5 block"
            >
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="address"
                name="address"
                onChange={({ target }) =>
                  setUserForm({
                    ...userForm,
                    [target.name]: target.value,
                  })
                }
                className=" border-gray-500 py-2 px-4 bg-white border-2 text-sm leading-5 rounded-md w-full block"
              />
            </div>
          </div>
        </div>
        <button
          onClick={HandleSubmit}
          className={`text-[rgb(255_255_255_/_var(--tw-text-opacity))] font-medium text-md leading-5 py-3 px-4 mt-6 w-full rounded-md border border-transparent bg-[rgb(79_70_229_/_var(--tw-bg-opacity))] ${
            disabledBtn === true ? "!bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          Pay $ {cartTotalSum}
        </button>
        <p className="mt-6 flex text-[rgb(107_114_128_/_var(--tw-text-opacity))] font-medium text-sm justify-center">
          <BiSolidLockAlt className="mr-2" size={20} />
          Chekout details stored in Console
        </p>
      </div>
    </Layout>
  );
}
