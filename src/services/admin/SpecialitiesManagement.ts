/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/server-fetch";
import { zodValidator } from "@/utility/zodValidator";
import { createSpecialtiesZodSchema } from "@/zodSchema/specialties.validation";

export async function createSpecialties(_currentState: any, formData: any) {
  try {
    const specialtyData = {
      title: formData.get("title"),
    };

    if (
      zodValidator(specialtyData, createSpecialtiesZodSchema).success === false
    ) {
      return zodValidator(specialtyData, createSpecialtiesZodSchema);
    }

    const validatedPayload = zodValidator(
      specialtyData,
      createSpecialtiesZodSchema
    ).data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/specialties", {
      body: newFormData,
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "Failed to create specialty. Please try again.",
    };
  }
}

export async function getSpecialties() {
  try {
    const res = await serverFetch.get("/specialties");
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "Failed to fetch specialties. Please try again.",
    };
  }
}

export async function deleteSpecialty(id: string) {
  try {
    const res = await serverFetch.delete(`/specialties/${id}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "Failed to delete specialty. Please try again.",
    };
  }
}
