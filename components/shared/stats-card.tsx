"use client";

import { AllHTMLAttributes, FC } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import { cn, formatPercent } from "@/lib/utils";
import { StatsData } from "@/types/global-types";
import { Star } from "lucide-react";
import { RankingType } from "@/constants/constants";

interface StatsBarProps extends AllHTMLAttributes<HTMLDivElement> {
  statsData: StatsData;
  type: RankingType | string;
  index: number;
}

const StatsBar: FC<StatsBarProps> = ({
  statsData,
  className,
  type,
  index,
  ...props
}) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const { label, value } = statsData;
  const dataToIncrement = type === "Rating" ? value * 10 : value;

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
      <div
        key={label}
        className="w-full h-[3rem] bg-zinc-200 dark:bg-gray-800 overflow-hidden rounded-lg transition-all duration-200  relative "
      >
        <div className="absolute inset-0 flex items-center justify-between px-4 gap-12 sm:gap-20">
          <span className="font-semibold uppercase text-sm text-white truncate">
            {label}
          </span>

          <span className="font-medium sm:font-semibold text-sm text-white">
            {type === "Rating" ? (
              <span className="flex items-center justify-center gap-1">
                {value}
                <Star className="fill-yellow-400 size-4 stroke-none" />
              </span>
            ) : (
              formatPercent(value)
            )}
          </span>
        </div>

        <div
          style={{
            width: isIntersecting ? formatPercent(dataToIncrement) : "0%",
            transitionDelay: `${index / 10}s`,
          }}
          className="overflow-hidden  h-full rounded-lg transition-all duration-700 bg-gradient-to-r from-blue-400 to-emerald-400 abolsolute"
        />
      </div>
    </div>
  );
};

export default StatsBar;
