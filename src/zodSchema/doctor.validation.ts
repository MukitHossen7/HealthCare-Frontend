import z from "zod";

export const createDoctorZodSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  contactNumber: z
    .string()
    .min(1, "Contact Number is required")
    .min(10, "Contact Number must be at least 10 characters long"),
  address: z.string().optional(),
  registrationNumber: z
    .string()
    .min(1, "Registration Number is required")
    .min(3, "Registration Number must be at least 3 characters long"),
  experience: z
    .number()
    .positive("Experience is required and must be more than 0"),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Gender must be either 'MALE' or 'FEMALE'",
  }),
  appointmentFee: z
    .number()
    .positive("Appointment Fee is required and must be more than 0"),
  qualification: z
    .string()
    .min(1, "Qualification is required")
    .min(3, "Qualification must be at least 3 characters long"),
  currentWorkingPlace: z
    .string()
    .min(1, "Current Working Place is required")
    .min(3, "Current Working Place must be at least 3 characters long"),
  designation: z
    .string()
    .min(1, "Designation is required")
    .min(2, "Designation must be at least 2 characters long"),
  profilePhoto: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Profile photo is required",
  }),
});

export const updateDoctorZodSchema = z.object({
  name: z.string().optional(),
  profilePhoto: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  experience: z.number().optional(),
  gender: z.string().optional(),
  appointmentFee: z.number().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});
