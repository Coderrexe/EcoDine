import Link from "next/link";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link
      href="/"
      className="font-museo uppercase font-medium text-xl text-foreground"
    >
      EcoDine
    </Link>
  );
};

export default Logo;
