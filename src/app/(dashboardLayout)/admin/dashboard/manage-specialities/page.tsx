import SpecialtiesManagementHeader from "@/components/modules/Dashboard/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import SpecialtiesTable from "@/components/modules/Dashboard/Admin/SpecialitiesManagement/SpecialitiesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getSpecialties } from "@/services/admin/SpecialitiesManagement";
import { Suspense } from "react";

const ManageSpecialtiesPage = async () => {
  const result = await getSpecialties();
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialtiesTable specialties={result.data} />
      </Suspense>
    </div>
  );
};

export default ManageSpecialtiesPage;
