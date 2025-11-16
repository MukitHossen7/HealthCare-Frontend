import SpecialtiesManagementHeader from "@/components/modules/Dashboard/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import RefreshButton from "@/components/shared/RefreshButton";

const ManageSpecialtiesPage = () => {
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
    </div>
  );
};

export default ManageSpecialtiesPage;
