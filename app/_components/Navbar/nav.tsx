import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface NavProps {}

const Nav: FC<NavProps> = ({}) => {
  return (
    <div className=" gap-4 lg:flex hidden">
      <Button asChild variant="ghost" size="sm">
        <Link href="/food/analysis-history">check your history</Link>
      </Button>

      <Button asChild variant="ghost" size="sm">
        <Link href="/food/average">
          Overall Rank
          <ArrowRight className="size-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default Nav;
