"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialities.interface";
import { getInputFieldError } from "@/utility/getInputFieldError";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialties?: ISpecialty[];
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSuccess,
  doctor,
  specialties,
}: IDoctorFormDialogProps) => {
  const isEdit = !!doctor;
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
  const [state, formAction, pending] = useActionState(
    isEdit ? updateDoctor.bind(null, doctor.id!) : createDoctor,
    null
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    doctor?.gender || "MALE"
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                defaultValue={isEdit ? doctor?.name : undefined}
              />
              {getInputFieldError("name", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("name", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                defaultValue={isEdit ? doctor?.email : undefined}
                disabled={isEdit}
              />
              {getInputFieldError("email", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("email", state)}
                </span>
              )}
            </Field>

            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                  {getInputFieldError("password", state) && (
                    <span className="text-red-600 font-medium text-xs -mt-2">
                      {getInputFieldError("password", state)}
                    </span>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                  />
                  {getInputFieldError("confirmPassword", state) && (
                    <span className="text-red-600 font-medium text-xs -mt-2">
                      {getInputFieldError("confirmPassword", state)}
                    </span>
                  )}
                </Field>
              </>
            )}

            <Field>
              <FieldLabel htmlFor="specialities">Speciality</FieldLabel>
              <Input
                id="specialities"
                name="specialities"
                placeholder="Select a speciality"
                // defaultValue={isEdit ? doctor?.doctorSpecialties?.[0]?.specialties?.title : ""}
                defaultValue={selectedSpeciality}
                type="hidden"
              />
              <Select
                value={
                  //   isEdit
                  //     ? doctor?.doctorSpecialties?.[0]?.specialties?.title || ""
                  //     : selectedSpeciality
                  selectedSpeciality
                }
                onValueChange={setSelectedSpeciality}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a speciality" />
                </SelectTrigger>
                <SelectContent>
                  {specialties && specialties.length > 0 ? (
                    specialties.map((speciality) => (
                      <SelectItem key={speciality.id} value={speciality.title}>
                        {speciality.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No specialities available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Select a speciality for the doctor
              </p>
              {getInputFieldError("specialities", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("specialities", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                defaultValue={doctor?.contactNumber}
              />
              {getInputFieldError("contactNumber", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("contactNumber", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={isEdit ? doctor?.address : undefined}
              />
              {getInputFieldError("address", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("address", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="registrationNumber">
                Registration Number
              </FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                defaultValue={isEdit ? doctor?.registrationNumber : undefined}
              />
              {getInputFieldError("registrationNumber", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("registrationNumber", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="experience">
                Experience (in years)
              </FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                defaultValue={isEdit ? doctor?.experience : undefined}
                min="0"
              />
              {getInputFieldError("experience", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("experience", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input
                id="gender"
                name="gender"
                placeholder="Select gender"
                defaultValue={gender}
                type="hidden"
              />
              <Select
                value={gender}
                onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              {getInputFieldError("gender", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("gender", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                defaultValue={isEdit ? doctor?.appointmentFee : undefined}
                min="0"
              />
              {getInputFieldError("appointmentFee", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("appointmentFee", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                defaultValue={isEdit ? doctor?.qualification : undefined}
              />
              {getInputFieldError("qualification", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("qualification", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current Working Place
              </FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                defaultValue={isEdit ? doctor?.currentWorkingPlace : undefined}
              />
              {getInputFieldError("currentWorkingPlace", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("currentWorkingPlace", state)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                defaultValue={isEdit ? doctor?.designation : undefined}
              />
              {getInputFieldError("designation", state) && (
                <span className="text-red-600 font-medium text-xs -mt-2">
                  {getInputFieldError("designation", state)}
                </span>
              )}
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                <Input id="file" name="file" type="file" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile photo for the doctor
                </p>
                {getInputFieldError("file", state) && (
                  <span className="text-red-600 font-medium text-xs -mt-2">
                    {getInputFieldError("file", state)}
                  </span>
                )}
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update Doctor"
                : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;
