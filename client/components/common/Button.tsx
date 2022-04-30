import { NextPage } from "next";
import { ButtonHTMLAttributes, Children } from "react";

// Green button
const Button: NextPage<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button {...props} className="btn btn-block btn-accent">
      {children}
    </button>
  );
};

export default Button;
