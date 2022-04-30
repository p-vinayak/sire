import { NextPage } from "next";

// Large title with big font
const Title: NextPage = ({ children }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default Title;
