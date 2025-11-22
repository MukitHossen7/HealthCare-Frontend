/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDoctor } from "@/types/doctor.interface";
import { serverFetch } from "@/utility/server-fetch";
import { zodValidator } from "@/utility/zodValidator";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zodSchema/doctor.validation";

export async function createDoctor(_prevState: any, formData: FormData) {
  try {
    const payload: IDoctor = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
      password: formData.get("password") as string,
    };

    const validatedPayload = zodValidator(payload, createDoctorZodSchema);
    if (!validatedPayload.success && validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: validatedPayload,
        errors: validatedPayload.errors,
      };
    }

    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: validatedPayload,
      };
    }

    const newPayload = {
      password: validatedPayload.data.password,
      name: validatedPayload.data.name,
      email: validatedPayload.data.email,
      contactNumber: validatedPayload.data.contactNumber,
      address: validatedPayload.data.address,
      registrationNumber: validatedPayload.data.registrationNumber,
      experience: validatedPayload.data.experience,
      gender: validatedPayload.data.gender,
      appointmentFee: validatedPayload.data.appointmentFee,
      qualification: validatedPayload.data.qualification,
      currentWorkingPlace: validatedPayload.data.currentWorkingPlace,
      designation: validatedPayload.data.designation,
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/user/create-doctor", {
      body: newFormData,
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "Failed to create specialty. Please try again.",
    };
  }
}

export async function getDoctors(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/doctors${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export async function getDoctorById(id: string) {
  try {
    const response = await serverFetch.get(`/doctors/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export async function updateDoctor(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const payload: Partial<IDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };
    const validatedPayload = zodValidator(payload, updateDoctorZodSchema).data;

    const response = await serverFetch.patch(`/doctors/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}

export async function deleteDoctor(id: string) {
  try {
    const response = await serverFetch.delete(`/doctors/${id}`);
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
