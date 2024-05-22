"use server";
import { collegeNameForm, collegeNameFormType } from "@/schema/zod-schema";
import db from "@/lib/db";
import { getCollegeByName, getUserSession } from "./index";

export const collegeNameFormAction = async (formData: collegeNameFormType) => {
  try {
    const validateSchema = collegeNameForm?.safeParse(formData);

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

    if (user?.collegeName) {
      return {
        error: "Already selected a college",
      };
    }

    const { collegeName } = validateSchema?.data;

    const isValidCollege = await getCollegeByName(collegeName);

    if (!isValidCollege) {
      return {
        error: "Not a valid college",
      };
    }

    await db?.user?.update({
      where: {
        id: user?.id,
      },
      data: {
        collegeName,
      },
    });

    return {
      redirect: true,
      success: "Succefully Selected College",
    };
  } catch (error) {
    return {
      error: "Internal server error",
    };
  }
};
