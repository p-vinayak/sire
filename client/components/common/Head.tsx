import { NextPage } from "next";
import NextHead from "next/head";

interface HeadProps {
  pageTitle: string;
}

// Meta-data for web-page
const Head: NextPage<HeadProps> = ({ pageTitle, children }) => {
  return (
    <NextHead>
      <title>Sire - {pageTitle}</title>
      {children}
    </NextHead>
  );
};

export default Head;
