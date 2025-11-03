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
import { DoctorFormDialog } from "./DoctorFormDialog";
import { useDoctors } from "@/hooks/useDoctor";
import { IDoctor } from "@/types/userTypes";
import HeartbeatLoader from "@/components/shared/Loader";

const DoctorTable = () => {
  const { doctors, isLoading } = useDoctors();
  // console.log(doctors);
  const handleDelete = async (id: string) => {
    console.log(id);
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };
  if (isLoading) {
    <HeartbeatLoader />;
  }
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
          {doctors?.data?.length > 0 ? (
            doctors?.data?.map((doctor: IDoctor) => (
              <TableRow key={doctor?.id}>
                <TableCell className="w-20 h-20">
                  {doctor?.profilePhoto ? (
                    <Image
                      src={doctor?.profilePhoto}
                      alt={doctor?.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{doctor?.name}</TableCell>
                <TableCell>{doctor?.email}</TableCell>
                <TableCell>{doctor?.qualification}</TableCell>
                <TableCell>${doctor?.appointmentFee}</TableCell>
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
