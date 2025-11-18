"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialities.interface";
import { specialtiesColumns } from "./specialitiesColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSpecialty } from "@/services/admin/SpecialitiesManagement";

interface SpecialtiesTableProps {
  specialties: ISpecialty[];
}

const SpecialtiesTable = ({ specialties }: SpecialtiesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSpecialty, setDeletingSpecialty] = useState<ISpecialty | null>(
    null
  );
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (specialty: ISpecialty) => {
    setDeletingSpecialty(specialty);
  };

  const confirmDelete = async () => {
    if (!deletingSpecialty) return;

    setIsDeletingDialog(true);
    const result = await deleteSpecialty(deletingSpecialty.id);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success("Specialty deleted successfully");
      setDeletingSpecialty(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete speciality");
    }
  };
  return (
    <>
      <ManagementTable
        data={specialties}
        columns={specialtiesColumns}
        onDelete={handleDelete}
        getRowKey={(specialty) => specialty.id}
        emptyMessage="No specialities found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingSpecialty}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={confirmDelete}
        title="Delete Specialty"
        description={`Are you sure you want to delete ${deletingSpecialty?.title}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialtiesTable;
