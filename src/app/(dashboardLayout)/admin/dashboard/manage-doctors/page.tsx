import DoctorsManagementHeader from "@/components/modules/Dashboard/Admin/DoctorsManagement/DoctorManagementHeader";
import DoctorTable from "@/components/modules/Dashboard/Admin/DoctorsManagement/DoctorTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialties } from "@/services/admin/SpecialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";

const ManageDoctorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const specialitiesResult = await getSpecialties();
  const doctorResult = await getDoctors(queryString);
  const meta = doctorResult?.data?.meta;
  const totalPage = Math.ceil(Number(meta?.total) / Number(meta?.limit));
  const currentPage = meta?.page;

  return (
    <div className="space-y-6">
      <DoctorsManagementHeader />
      <div className="flex space-x-3">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <SelectFilter
          paramName="speciality"
          options={specialitiesResult?.data?.map((speciality: ISpecialty) => ({
            label: speciality.title,
            value: speciality.title,
          }))}
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <DoctorTable doctors={doctorResult?.data?.data} />
        <TablePagination currentPage={currentPage} totalPage={totalPage} />
      </Suspense>
    </div>
  );
};

export default ManageDoctorsPage;
