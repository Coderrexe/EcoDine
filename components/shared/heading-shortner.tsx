import { cn } from "@/lib/utils";
import { AllHTMLAttributes, FC } from "react";

interface HeadingShortnerProps extends AllHTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const HeadingShortner: FC<HeadingShortnerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <>
      <h2 className={cn("text-xl w-fit  font-medium ", className)} {...props}>
        {children}
        <hr className="mt-1 custom_border rounded-full " />
      </h2>
    </>
  );
};

export default HeadingShortner;
