"use server";
import {
  AnalysisSubmitSchemaType,
  analysisFormSubmitSchema,
} from "@/schema/zod-schema";
import db from "@/lib/db";
import { getUserSession } from "./index";
import { endOfDay, startOfDay } from "@/lib/time";
import { creationLimit } from "@/constants";
import { revalidateTag } from "next/cache";

export const createAnalysis = async (formData: AnalysisSubmitSchemaType) => {
  try {
    const validateFields = analysisFormSubmitSchema?.safeParse(formData);

    if (!validateFields?.success) {
      return {
        error: "Invalid Data sent.",
      };
    }

    const user = await getUserSession();

    if (!user?.id) {
      return {
        erorr: "No use Found",
      };
    }

    if (!user?.collegeName) {
      return {
        error: "Please select a college",
      };
    }

    if (!user?.houseName) {
      return {
        error: "Please select a house",
      };
    }

    if (user?.userRole === "USER") {
      const isAlreadySubmitted =
        (await db?.foodData?.count({
          where: {
            userId: user?.id,
            updatedAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        })) + 1;

      const isExistLimit = isAlreadySubmitted > creationLimit;

      if (isExistLimit) {
        return {
          error: "Your daily limit exhaust",
        };
      }
    }

    const formattedData = formData?.foodStats?.map(
      ({ foodName, foodlike, rating, wastage }) => ({
        foodName,
        foodRating: Number(rating),
        userId: user?.id,
        foodWastage: Number(wastage),
        likeFood: !!foodlike,
      })
    );

    await db?.foodData?.create({
      data: {
        userId: user?.id!,
        foodTiming: formData?.foodTiming,
        collegeName: user?.collegeName,
        houseName: user?.houseName,
        food: {
          createMany: {
            data: formattedData,
          },
        },
      },
    });

    if (user?.userRole !== "ADMIN") {
      revalidateTag("refetchVerification");
    }

    return {
      success: "Succefully Submitted",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server Error",
    };
  }
};
