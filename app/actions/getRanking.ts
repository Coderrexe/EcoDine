"use server";

import db from "@/lib/db";
import { getUserSession } from ".";

export const getRankingByPast7Days = async () => {
  try {
    const user = await getUserSession();

    if (!user?.id) {
      return [];
    }

    if (!user?.collegeName || !user?.houseName) {
      return [];
    }

    const allUsersRating = await db?.foodStats?.groupBy({
      where: {
        FoodData: {
          collegeName: user?.collegeName,
          createdAt: {
            gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      by: ["foodName"],
      _avg: {
        foodRating: true,
        foodWastage: true,
      },
    });

    return allUsersRating;
  } catch (error) {
    return [];
  }
};

export const getOverAllRanking = async () => {
  try {
    const user = await getUserSession();

    if (!user?.id) {
      return [];
    }

    if (!user?.collegeName || !user?.houseName) {
      return [];
    }

    const allUsersRating = await db?.foodStats?.groupBy({
      where: {
        FoodData: {
          collegeName: user?.collegeName,
        },
      },
      by: ["foodName"],
      _avg: {
        foodRating: true,
        foodWastage: true,
      },
    });

    return allUsersRating;
  } catch (error) {
    return [];
  }
};
