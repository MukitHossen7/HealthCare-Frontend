/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Columns } from "@/components/shared/ManagementTable";
import { IDoctor } from "@/types/doctor.interface";
import { Star } from "lucide-react";

export const DoctorsColumns: Columns<IDoctor>[] = [
  {
    header: "Doctor",
    accessor: (doctor) => (
      <UserInfoCell
        name={doctor.name}
        email={doctor.email}
        photo={doctor.profilePhoto}
      />
    ),
  },
  {
    header: "Specialties",
    accessor: (doctor) => (
      <div className="flex flex-wrap gap-1">
        {doctor?.doctorSpecialties && doctor?.doctorSpecialties.length > 0 ? (
          doctor.doctorSpecialties.map((item: any, index: number) => {
            const specialty = item.specialties; // extract the nested object

            return (
              <span
                key={specialty?.id || index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {specialty?.title}
              </span>
            );
          })
        ) : (
          <span className="text-xs text-gray-500">No specialties</span>
        )}
      </div>
    ),
  },
  {
    header: "Contact",
    accessor: (doctor) => (
      <div className="flex flex-col">
        <span className="text-sm">{doctor.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Experience",
    accessor: (doctor) => (
      <span className="text-sm font-medium">
        {doctor.experience ?? 0} years
      </span>
    ),
  },
  {
    header: "Fee",
    accessor: (doctor) => (
      <span className="text-sm font-semibold text-green-600">
        ${doctor.appointmentFee}
      </span>
    ),
  },
  {
    header: "Rating",
    accessor: (doctor) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {doctor.averageRating!.toFixed(1)}
        </span>
      </div>
    ),
  },
  {
    header: "Gender",
    accessor: (doctor) => (
      <span className="text-sm capitalize">{doctor.gender.toLowerCase()}</span>
    ),
  },
  // {
  //   header: "Status",
  //   accessor: (doctor) => <StatusBadgeCell isDeleted={doctor.updatedAt} />,
  // },
  {
    header: "Joined",
    accessor: (doctor) => <DateCell date={doctor.createdAt} />,
  },
];
