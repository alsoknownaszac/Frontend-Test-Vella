import React from "react";

interface IError {
  children?: React.ReactNode;
}

export default function ErrorHandling(props: IError) {
  return <div>{props.children}</div>;
}
