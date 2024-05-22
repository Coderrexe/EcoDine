"use client";

import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type { User } from "@prisma/client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-model";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Controls = ({ user }: { user: User }) => {
  const authModal = useAuthModal();
  const { setTheme } = useTheme();
  const router = useRouter();

  const isAuth = !!user;

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="flex space-x-2">
      {isAuth ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback>
                  {user?.name?.substring(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router?.push("/food/analysis-history")}
              >
                Your history
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router?.push("/food/average")}>
                Overall Ranking
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router?.push("/food/analysis-form")}
              >
                Analysis form
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem onClick={handleLogout}>
                Logout
                <DropdownMenuShortcut>
                  <LogOut className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            onClick={() => authModal?.onOpen()}
            size="sm"
            variant="ghost"
            className="border "
          >
            <LogIn className=" w-4 h-4 mr-2" />
            Login
          </Button>
        </>
      )}
    </div>
  );
  1;
};

export default Controls;
