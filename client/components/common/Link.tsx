import { NextPage } from "next";
import { AnchorHTMLAttributes } from "react";
import NextLink from "next/link";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  href: string;
}

// Next.js links with styled link embedded into it
const Link: NextPage<LinkProps> = ({ href, text, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props} className="link link-hover text-blue-600">
        {text}
      </a>
    </NextLink>
  );
};

export default Link;
