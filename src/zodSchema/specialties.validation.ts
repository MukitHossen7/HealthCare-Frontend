import z from "zod";

export const createSpecialtiesZodSchema = z.object({
  title: z.string().min(1, { error: "Title is required." }),
});
