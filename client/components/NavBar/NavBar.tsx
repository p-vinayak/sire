import { NextPage } from "next";
import NavLinks from "./NavLinks";
import NavTitle from "./NavTitle";

// Topside navbar
const NavBar: NextPage = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <NavTitle title="Sire" href="/" />
      </div>
      <div className="flex-none">
        <NavLinks />
      </div>
    </div>
  );
};

export default NavBar;
