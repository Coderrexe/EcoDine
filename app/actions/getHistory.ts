"use server";

import db from "@/lib/db";
import { getUserSession } from ".";
import { getAnalyticsHistoryInterface } from "@/types/global-types";

export const getAnalyticsHistory = async ({
  skip = 0,
  take = 2,
}: getAnalyticsHistoryInterface) => {
  try {
    const user = await getUserSession();

    if (!user) {
      return [];
    }

    const userAnalyticsHistory = await db?.foodStats?.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        FoodData: {
          createdAt: "desc",
        },
      },
      include: {
        FoodData: true,
      },
      take,
      skip,
    });

    if (!userAnalyticsHistory) {
      return [];
    }

    const newData = userAnalyticsHistory?.map(
      ({ id, foodName, foodRating, foodWastage, likeFood, FoodData }) => ({
        id,
        food: foodName,
        rating: foodRating,
        wastage: foodWastage,
        isLiked: likeFood,
        timing: FoodData?.foodTiming!,
        createdAt: FoodData?.createdAt!,
      })
    );

    return newData;
  } catch (error) {
    return [];
  }
};
