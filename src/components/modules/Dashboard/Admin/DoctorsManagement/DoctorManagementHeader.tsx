"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DoctorFormDialog from "./DoctorFormDialog";
import { ISpecialty } from "@/types/specialities.interface";

interface DoctorsManagementHeaderProps {
  specialities?: ISpecialty[];
}

const DoctorsManagementHeader = ({
  specialities,
}: DoctorsManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <div>
      <DoctorFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        specialities={specialities}
      />
      <ManagementPageHeader
        title="Doctors Management"
        description="Manage Doctors information and details"
        action={{
          label: "Add Doctor",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </div>
  );
};
export default DoctorsManagementHeader;
