import { auth } from "@/auth";
import db from "@/lib/db";
import { endOfDay, startOfDay } from "@/lib/time";
import { revalidateTag } from "next/cache";

export const getCollegeByName = async (collegeName: string) => {
  try {
    const college = db?.collegeList?.findFirst({
      where: {
        collegeName,
      },
    });

    return college;
  } catch (error) {
    return null;
  }
};

export const getHouseByName = async (houseName: string) => {
  try {
    const house = db?.house?.findFirst({
      where: {
        houseName,
      },
    });

    return house;
  } catch (error) {
    return null;
  }
};

export const getUserSession = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return null;
    }

    const user = await db?.user?.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getFoodList = async (houseName: string) => {
  try {
    const house = await getHouseByName(houseName);

    const foodList = await db?.foodList?.findMany({
      where: {
        houseId: house?.id,
      },
    });
    return foodList;
  } catch (error) {
    return [];
  }
};

export const getSubmissionStats = async () => {
  try {
    const user = await getUserSession();

    if (!user) {
      return null;
    }

    if (user?.userRole === "USER") {
      const userCreations = await db?.foodData?.findMany({
        where: {
          userId: user?.id,
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });

      revalidateTag("refetchVerification");
      return userCreations;
    }

    return null;
  } catch (error) {
    return null;
  }
};
