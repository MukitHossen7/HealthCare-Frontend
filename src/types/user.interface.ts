export interface IAuthUser {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  needPasswordChange: boolean;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  name: string;
  profilePhoto: string;
}

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: string;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  doctorSpecialties: DoctorSpecialty[];
  reviews: Review[];
}

export interface DoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: Specialties;
}

export interface Specialties {
  id: string;
  title: string;
  icon: string;
}

export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
