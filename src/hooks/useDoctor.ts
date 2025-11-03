import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getDoctors = async () => {
  const res = await fetch(`${baseURL}/doctors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("failed to fetch doctors");
  }
  const data = await res.json();
  return data?.data;
};

export const createDoctor = async (formData: FormData) => {
  const res = await fetch(`${baseURL}/user/create-doctor`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("failed to create doctor");
  }
  const data = await res.json();
  return data;
};

export const updateDoctor = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const res = await fetch(`${baseURL}/doctors/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update doctor");
  const data = await res.json();
  return data.data;
};

export const deleteDoctor = async (id: string) => {
  const res = await fetch(`${baseURL}/doctors/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete doctor");
  const data = await res.json();
  return data;
};

export function useDoctors() {
  const queryClient = useQueryClient();
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const addDoctor = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  const editDoctor = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  const removeDoctor = useMutation({
    mutationFn: deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  return { doctors, isLoading, addDoctor, removeDoctor, editDoctor };
}
