import { getUserSession } from "@/app/actions";
import { redirect } from "next/navigation";

interface CollegenameLayoutProps {
  children: React.ReactNode;
}

const CollegenameLayout = async ({ children }: CollegenameLayoutProps) => {
  const user = await getUserSession();

  if (!user?.id) {
    return redirect("/");
  }

  if (user?.collegeName && !user?.houseName) {
    redirect("/house-name");
  }

  if (user?.collegeName && user?.houseName) {
    redirect("/food/analysis-form");
  }

  return <>{children}</>;
};

export default CollegenameLayout;
