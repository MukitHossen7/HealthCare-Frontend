export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  needPasswordChange: boolean;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  name: string;
  profilePhoto: string;
}
