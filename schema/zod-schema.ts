import { z } from "zod";

export const collegeNameForm = z.object({
  collegeName: z.string().min(3),
});

export type collegeNameFormType = z.infer<typeof collegeNameForm>;

export const houseNameForm = z.object({
  houseName: z.string().min(3),
});

export type houseNameFormType = z.infer<typeof houseNameForm>;

export const AnalysisFormSchema = z.object({
  foodName: z.string().min(2),
  rating: z.coerce.number(),
  wastage: z.coerce.number(),
  foodlike: z.boolean().optional(),
});

export const analysisFormSubmitSchema = z.object({
  foodTiming: z.enum(["LUNCH", "DINNER"]),
  foodStats: z.array(AnalysisFormSchema).nonempty(),
});

export type AnalysisFormSchemaType = z.infer<typeof AnalysisFormSchema>;
export type AnalysisSubmitSchemaType = z.infer<typeof analysisFormSubmitSchema>;
