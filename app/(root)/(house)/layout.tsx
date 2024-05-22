import { getUserSession } from "@/app/actions";
import { redirect } from "next/navigation";

interface HouseNameLayoutProps {
  children: React.ReactNode;
}

const HouseNameLayout = async ({ children }: HouseNameLayoutProps) => {
  const user = await getUserSession();

  if (!user?.id) {
    return redirect("/");
  }

  if (!user?.collegeName) {
    redirect("/college-name");
  }

  if (user?.collegeName && user?.houseName) {
    redirect("/food/analysis-form");
  }

  return <>{children}</>;
};

export default HouseNameLayout;
