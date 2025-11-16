import { ISpecialty } from "./specialities.interface";

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  doctorSpecialties?: Array<{
    Specialties?: ISpecialty;
  }>;
}
