import { ISpecialty } from "./specialities.interface";

export interface IDoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: ISpecialty; // <-- this is NOT an array
}
export interface IDoctor {
  id?: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  password?: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
  doctorSpecialties?: IDoctorSpecialty[];
}
