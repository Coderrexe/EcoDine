import { rankingDataInterface } from "@/types/global-types";
import { FC } from "react";
import StatsBar from "./stats-card";
import { RankingType } from "@/constants/constants";
import { numberFormatter } from "@/lib/utils";

interface StatsDataProps {
  rankingData: rankingDataInterface[];
  type: RankingType | string;
}

const StatsData: FC<StatsDataProps> = ({ rankingData, type }) => {
  return (
    <section className="my-12">
      <div>
        <span className="text-base font-semibold ">
          {type === "Rating" ? "Food Ratings" : "Food Wastage"}
        </span>
        <div className="grid grid-cols-1 gap-10 mt-4">
          {rankingData?.map((data, index) => (
            <StatsBar
              key={data?.foodName}
              type={type}
              statsData={{
                label: data?.foodName,
                value: numberFormatter(
                  type === "Rating"
                    ? data?._avg?.foodRating!
                    : data?._avg?.foodWastage!
                ),
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsData;
