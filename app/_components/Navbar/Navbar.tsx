import { FC } from "react";
import Container from "@/components/shared/global-container";
import type { User } from "@prisma/client";

import Controls from "./controls";
import Nav from "./nav";
import Logo from "./logo";

interface NavbarProps {
  user: User;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <header className="border-b sticky top-0 bg-background  z-[100]">
      <Container className="w-full h-20 flex items-center justify-between px-4 space-x-8 ">
        <Logo />
        <div className="lg:flex lg:items-center lg:justify-center lg:gap-8">
          {user && <Nav />}
          <Controls user={user} />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
