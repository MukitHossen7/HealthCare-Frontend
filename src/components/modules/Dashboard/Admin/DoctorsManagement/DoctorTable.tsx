"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { IDoctor } from "@/types/doctor.interface";
import { DoctorsColumns } from "./DoctorColumns";
import { deleteDoctor } from "@/services/admin/doctorManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface DoctorsTableProps {
  doctors: IDoctor[];
}

const DoctorTable = ({ doctors }: DoctorsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (doctor: IDoctor) => {
    setDeletingDoctor(doctor);
  };

  const confirmDelete = async () => {
    if (!deletingDoctor) return;

    setIsDeleting(true);
    const result = await deleteDoctor(deletingDoctor.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Doctor deleted successfully");
      setDeletingDoctor(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };
  return (
    <>
      <ManagementTable
        data={doctors}
        columns={DoctorsColumns}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No doctors found"
      />
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(open) => !open && setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default DoctorTable;
