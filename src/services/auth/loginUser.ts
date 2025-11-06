/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import * as z from "zod";

const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(10, { error: "Password must not exceed 10 characters." }),
});

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const loginData = {
      password: formData.get("password"),
      email: formData.get("email"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Login User",
    };
  }
};
