/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/utility/server-fetch";
import z from "zod";

const createSpecialtiesZodSchema = z.object({
  title: z.string().min(1, { error: "Title is required." }),
});

export async function createSpecialties(_currentState: any, formData: any) {
  try {
    const specialtyData = {
      title: formData.get("title"),
    };

    const validatedFields = createSpecialtiesZodSchema.safeParse(specialtyData);
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

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(specialtyData));

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
