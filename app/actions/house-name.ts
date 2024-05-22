"use server";
import { houseNameForm, houseNameFormType } from "@/schema/zod-schema";
import db from "@/lib/db";
import { getHouseByName, getUserSession } from "./index";

export const houseNameFormAction = async (formData: houseNameFormType) => {
  try {
    const validateSchema = houseNameForm?.safeParse(formData);

    if (!validateSchema?.success) {
      return {
        error: "Invalid credentials",
      };
    }

    const user = await getUserSession();

    if (!user?.id) {
      return {
        error: "Unauthorized user",
      };
    }

    if (user?.houseName) {
      return {
        error: "Already selected a house",
      };
    }

    const { houseName } = validateSchema?.data;

    const isValidHouse = await getHouseByName(houseName);

    if (!isValidHouse) {
      return {
        error: "Not a valid house",
      };
    }

    await db?.user?.update({
      where: {
        id: user?.id,
      },
      data: {
        houseName,
      },
    });

    return {
      redirect: true,
      success: "Succefully Selected House",
    };
  } catch (error) {
    return {
      error: "Internal server error",
    };
  }
};
