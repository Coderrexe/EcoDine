import { getUserSession } from "@/app/actions";
import { redirect } from "next/navigation";

interface FoodLayoutProps {
  children: React.ReactNode;
}

const FoodLayout = async ({ children }: FoodLayoutProps) => {
  const user = await getUserSession();

  if (!user?.id || !user?.collegeName || !user?.houseName) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default FoodLayout;
