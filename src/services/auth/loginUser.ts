/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const loginData = {
      password: formData.get("password"),
      email: formData.get("email"),
    };

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
