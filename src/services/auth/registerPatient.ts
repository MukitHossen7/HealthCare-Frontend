/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const registerPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
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
