import { NextPage } from "next";

// Box container
const Box: NextPage = ({ children }) => {
  return <div className="p-4 bg-base-300 shadow-lg rounded-md">{children}</div>;
};

export default Box;
