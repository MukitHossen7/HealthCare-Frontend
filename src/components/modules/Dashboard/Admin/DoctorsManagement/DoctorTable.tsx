"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { IDoctor } from "@/types/doctor.interface";
import { DoctorsColumns } from "./DoctorColumns";
import { deleteDoctor } from "@/services/admin/doctorManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import DoctorViewDetailDialog from "./DoctorViewDetailDialog";
import DoctorFormDialog from "./DoctorFormDialog";
import { ISpecialty } from "@/types/specialities.interface";

interface DoctorsTableProps {
  doctors: IDoctor[];
  specialities: ISpecialty[];
}

const DoctorTable = ({ doctors, specialities }: DoctorsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingDoctor, setViewingDoctor] = useState<IDoctor | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (doctor: IDoctor) => {
    setViewingDoctor(doctor);
  };

  const handleEdit = (doctor: IDoctor) => {
    setEditingDoctor(doctor);
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
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(doctor) => doctor.id!}
        emptyMessage="No doctors found"
      />

      {/* Edit Doctor Form Dialog */}
      <DoctorFormDialog
        open={!!editingDoctor}
        onClose={() => setEditingDoctor(null)}
        doctor={editingDoctor!}
        specialities={specialities}
        onSuccess={() => {
          setEditingDoctor(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog */}
      <DoctorViewDetailDialog
        open={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        doctor={viewingDoctor}
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
