import { NextPage } from "next";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
}

// Link for navigation
const NavLink: NextPage<NavLinkProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <a className="btn btn-ghost text-md" href={href}>
        {title}
      </a>
    </Link>
  );
};

export default NavLink;
