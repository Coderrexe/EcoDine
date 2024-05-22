"use server";

import db from "@/lib/db";
import { getCollegeByName, getUserSession } from ".";

export const getCollegeList = async () => {
  try {
    const collegeList = await db?.collegeList?.findMany();
    return collegeList;
  } catch (error) {
    return [];
  }
};

export const getHouseList = async () => {
  try {
    const user = await getUserSession();

    if (!user || !user?.collegeName) {
      return [];
    }
    const college = await getCollegeByName(user?.collegeName!);

    const houseList = await db?.house?.findMany({
      where: {
        collegeListId: college?.id,
      },
    });
    return houseList;
  } catch (error) {
    return [];
  }
};
