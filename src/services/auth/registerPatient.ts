/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginUser } from "./loginUser";
import { serverFetch } from "@/utility/server-fetch";
import { zodValidator } from "@/utility/zodValidator";
import { registerPatientZodSchema } from "@/zodSchema/auth.validation";

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

    if (
      zodValidator(patientSchemaData, registerPatientZodSchema).success ===
      false
    ) {
      return zodValidator(patientSchemaData, registerPatientZodSchema);
    }

    const validatedPayload = zodValidator(
      patientSchemaData,
      registerPatientZodSchema
    ).data;

    const patientData = {
      password: validatedPayload?.password,
      patient: {
        name: validatedPayload?.name,
        email: validatedPayload?.email,
        address: validatedPayload?.address,
        gender: validatedPayload?.gender,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(patientData));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/user/create-patient", {
      body: newFormData,
    });
    const data = await res.json();
    if (data.success) {
      await loginUser(_currentState, formData);
    }
    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }
};
