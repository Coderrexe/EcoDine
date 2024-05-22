"use client";

import type { User } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface RedirectButtonProps {
  user: User | null;
  buttonLabel: string;
  redirectUrl: string;
}

const RedirectButton = ({
  user,
  buttonLabel,
  redirectUrl,
}: RedirectButtonProps) => {
  const router = useRouter();

  const handleToogle = () => {
    if (!user) {
      return toast.error("Please login first");
    }
    router.push(redirectUrl);
  };

  return (
    <Button
      onClick={handleToogle}
      className="bg-gradient-to-r from-blue-400 to-emerald-400 mt-8 px-8 text-white "
    >
      {buttonLabel} <ArrowRight className="ml-2" size={20} />
    </Button>
  );
};

export default RedirectButton;
