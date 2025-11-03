/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { DoctorFormDialog } from "./DoctorFormDialog";

const doctors = [
  {
    id: "4bcf461a-0043-4d47-b259-d4a8f3aceb71",
    name: "Dr. Roksana Akter",
    email: "roksana.akter@example.com",
    profilePhoto:
      "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760971590/healthcare_download_%281%29_c9de798b-7afb-4722-8fcd-a3e591ef78b3_1760971587659.jpg",
    contactNumber: "+8801811122240",
    address: "Dhanmondi, Dhaka",
    registrationNumber: "BMDC-14596",
    experience: 6,
    gender: "FEMALE",
    appointmentFee: 800,
    qualification: "MBBS, FCPS (Gynecology)",
    currentWorkingPlace: "Labaid Hospital, Dhaka",
    designation: "Consultant, Gynecology",
    averageRating: 0,
    createdAt: "2025-10-20T14:46:32.424Z",
    updatedAt: "2025-10-20T14:46:32.424Z",
    doctorSpecialties: [
      {
        specialtiesId: "a8e41133-1f7c-44ce-9772-67c2291e7743",
        doctorId: "4bcf461a-0043-4d47-b259-d4a8f3aceb71",
        specialties: {
          id: "a8e41133-1f7c-44ce-9772-67c2291e7743",
          title: "Dermatology",
          icon: "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760970080/healthcare_download_4701170e-45eb-40a9-b0ac-793f70d99950_1760970077441.png",
        },
      },
    ],
    reviews: [],
  },
  {
    id: "ebab64fe-d324-4ae7-93d4-3a5ca9c44e9b",
    name: "Dr. Saifullah Khan",
    email: "saifullah.khan@example.com",
    profilePhoto:
      "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760971489/healthcare_download_%281%29_301a7157-86c8-4cb0-992a-3e5acdc9e3d6_1760971485352.jpg",
    contactNumber: "+8801811122239",
    address: "Motijheel, Dhaka",
    registrationNumber: "BMDC-14595",
    experience: 11,
    gender: "MALE",
    appointmentFee: 1100,
    qualification: "MBBS, MD (Pulmonology)",
    currentWorkingPlace: "Square Hospital, Dhaka",
    designation: "Senior Consultant, Pulmonology",
    averageRating: 0,
    createdAt: "2025-10-20T14:45:00.643Z",
    updatedAt: "2025-10-20T14:45:00.643Z",
    doctorSpecialties: [
      {
        specialtiesId: "214eab54-32a9-475c-94bb-df3fd27b1cd6",
        doctorId: "ebab64fe-d324-4ae7-93d4-3a5ca9c44e9b",
        specialties: {
          id: "214eab54-32a9-475c-94bb-df3fd27b1cd6",
          title: "Orthopedics",
          icon: "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760970173/healthcare_download_%281%29_40aede22-7828-48f5-ae6e-f912d00dade3_1760970167626.png",
        },
      },
    ],
    reviews: [],
  },
  {
    id: "ec6a196e-ae7f-4b14-9a32-b61cf548d91d",
    name: "Dr. Nadia Karim",
    email: "nadia.karim@example.com",
    profilePhoto:
      "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760971393/healthcare_download_%281%29_1e38220b-dd4d-47d6-890d-2ce8db5a61aa_1760971386368.jpg",
    contactNumber: "+8801811122238",
    address: "Uttara, Dhaka",
    registrationNumber: "BMDC-14594",
    experience: 9,
    gender: "FEMALE",
    appointmentFee: 950,
    qualification: "MBBS, MD (Gastroenterology)",
    currentWorkingPlace: "United Hospital, Dhaka",
    designation: "Consultant, Gastroenterology",
    averageRating: 0,
    createdAt: "2025-10-20T14:43:16.974Z",
    updatedAt: "2025-10-20T14:43:16.974Z",
    doctorSpecialties: [
      {
        specialtiesId: "5e31af15-9399-476c-b547-b747acaa14fa",
        doctorId: "ec6a196e-ae7f-4b14-9a32-b61cf548d91d",
        specialties: {
          id: "5e31af15-9399-476c-b547-b747acaa14fa",
          title: "Gynecology",
          icon: "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760970360/healthcare_download_%285%29_bc09fcbe-0bca-4958-b026-98f1a7a41211_1760970357550.png",
        },
      },
      {
        specialtiesId: "8c9db34a-12fe-48f3-bcb7-8dbd642e83e1",
        doctorId: "ec6a196e-ae7f-4b14-9a32-b61cf548d91d",
        specialties: {
          id: "8c9db34a-12fe-48f3-bcb7-8dbd642e83e1",
          title: "ENT",
          icon: "https://res.cloudinary.com/dcyf1ajnc/image/upload/v1760970288/healthcare_download_7e2f70a1-b62e-4ca5-8527-3ab7c99c8bee_1760970283359.jpg",
        },
      },
    ],
    reviews: [],
  },
];

const DoctorTable = () => {
  const handleDelete = async (id: string) => {
    console.log(id);
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };
  return (
    <main className="mt-10 p-10 mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="">
          <h2 className="text-3xl font-bold">Manage Doctors</h2>
          <p className="text-muted-foreground mt-1">
            Add, update, and delete doctors with ease.
          </p>
        </div>
        <DoctorFormDialog />
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors?.length > 0 ? (
            doctors.map((doctor: any) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  {doctor.profilePhoto ? (
                    <Image
                      src={doctor.profilePhoto}
                      alt={doctor.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.qualification}</TableCell>
                <TableCell>${doctor.appointmentFee}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(doctor.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(doctor.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No doctors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
};

export default DoctorTable;
