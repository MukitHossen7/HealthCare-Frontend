import z from "zod";

export const registerPatientZodSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required." }),
    email: z.email({ error: "Email is required." }),
    address: z.string().min(1, { error: "Address is required." }),

    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters long." })
      .max(10, { error: "Password cannot exceed 10 characters." })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { error: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        error: "Password must contain at least one special character.",
      }),

    confirmPassword: z
      .string()
      .min(6, { error: "Confirm password is required" }),
    gender: z.enum(["MALE", "FEMALE"], {
      error: "Please select your gender.",
    }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(10, { error: "Password must not exceed 10 characters." }),
});
