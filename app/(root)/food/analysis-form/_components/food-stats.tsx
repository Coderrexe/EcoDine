import { Button } from "@/components/ui/button";
import { AnalysisFormSchemaType } from "@/schema/zod-schema";
import { Star, Trash } from "lucide-react";
import { FC } from "react";

interface StatsCardProps {
  data: AnalysisFormSchemaType;
  handleRemove: (foodName: string) => void;
  isPending: boolean;
}

const StatsCard: FC<StatsCardProps> = ({ data, handleRemove, isPending }) => {
  const { foodName, rating, wastage, foodlike } = data;

  return (
    <div className="grid  border grid-cols-1 min-[440px]:grid-cols-2 min-[547px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3  p-4 ">
      <span className="text-foreground text-sm font-semibold flex items-center sm:justify-center">
        <span className="text-slate-400">FoodName: </span>
        {foodName}
      </span>
      <span className="text-foreground text-sm font-semibold flex  lg:items-center sm:justify-center">
        <span className="text-slate-400">FoodRating: &nbsp;</span>
        <span className="flex items-center justify-center">
          {rating}
          &nbsp;
          <Star className="size-4 fill-yellow-400 stroke-none" />
        </span>
      </span>
      <span className="text-foreground text-sm font-semibold flex items-center sm:justify-center">
        <span className="text-slate-400">FoodWastage: &nbsp;</span>
        {wastage}%
      </span>

      <span className="text-foreground text-sm font-semibold flex items-center sm:justify-center">
        <span className="text-slate-400">Interest: &nbsp;</span>
        {foodlike ? "Liked" : "Disliked"}
      </span>

      <Button
        variant="outline"
        onClick={() => handleRemove(foodName)}
        type="button"
        disabled={isPending}
        className="hover:bg-red-700 hover:text-white min-[440px]:col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1"
      >
        <Trash className="size-4 mr-2" />
        remove
      </Button>
    </div>
  );
};

export default StatsCard;
