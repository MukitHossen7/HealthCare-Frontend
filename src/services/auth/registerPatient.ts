/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import * as z from "zod";

const registerPatientZodSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required." }),
    email: z.email().min(1, { error: "Address is required." }),
    address: z.string().min(1, { error: "Address is required." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(10, { message: "Password cannot exceed 10 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character.",
      }),

    confirmPassword: z.string(),
    gender: z.enum(["MALE", "FEMALE"], {
      error: "Please select your gender.",
    }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const patientSchemaData = {
      password: formData.get("password"),
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      gender: formData.get("gender"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields =
      registerPatientZodSchema.safeParse(patientSchemaData);
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
    const patientData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
        gender: formData.get("gender"),
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(patientData));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`,
      {
        method: "POST",
        body: newFormData,
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Registration failed",
    };
  }
};
