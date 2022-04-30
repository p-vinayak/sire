import { NextPage } from "next";
import Link from "next/link";

interface NavTitleProps {
  title: string;
  href: string;
}

// Navbar title
const NavTitle: NextPage<NavTitleProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <a className="btn btn-ghost normal-case text-2xl">{title}</a>
    </Link>
  );
};

export default NavTitle;
