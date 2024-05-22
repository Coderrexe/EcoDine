"use client";

import { FC, useEffect, useState } from "react";
import type { FoodData, FoodList, User, foodTiming } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsData } from "@/constants/constants";

import AnalysisForm from "./analysis-form";
import LimitExhaust from "./limit-exhaust";

interface FormRendererProps {
  foodList: FoodList[];
  data: FoodData[] | null;
  user: User | null;
}

const FormRenderer: FC<FormRendererProps> = ({ foodList, data, user }) => {
  const [foodDataTiming, setFoodDataTiming] = useState<foodTiming | string>();

  const hasLunch = data?.some((e) => e?.foodTiming === "LUNCH");
  const hasDinner = data?.some((e) => e?.foodTiming === "DINNER");
  const hasBoth = !!(hasLunch && hasDinner);

  useEffect(() => {
    if (user?.userRole !== "ADMIN") {
      updatedValue();
    }
  }, [data]);

  const updatedValue = () => {
    if (hasBoth) {
      setFoodDataTiming("nodata");
      return;
    }

    if (hasDinner) {
      setFoodDataTiming("LUNCH");
      return;
    }

    if (hasLunch) {
      setFoodDataTiming("DINNER");
      return;
    }
  };

  const handleDisable = (value: string) => {
    if (user?.userRole !== "ADMIN") {
      return data?.some((e) => e?.foodTiming! === value);
    }
    return false;
  };

  return (
    <Tabs className="mt-8" defaultValue="LUNCH" value={foodDataTiming}>
      <TabsList className="w-[50%] md:w-[30%] grid grid-cols-2">
        {tabsData?.map(({ id, label, value }) => (
          <TabsTrigger disabled={handleDisable(value)} key={id} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsData?.map(({ id, value }) => (
        <TabsContent key={id + 56} value={value}>
          <AnalysisForm type={value} user={user} foodList={foodList} />
        </TabsContent>
      ))}

      <TabsContent key={457456756} value={"nodata"}>
        <LimitExhaust />
      </TabsContent>
    </Tabs>
  );
};

export default FormRenderer;
