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
import { createSpecialties } from "@/services/admin/SpecialitiesManagement";
import { getInputFieldError } from "@/utility/getInputFieldError";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ISpecialtiesFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpecialtiesFormDialog = ({
  open,
  onClose,
  onSuccess,
}: ISpecialtiesFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createSpecialties, null);
  useEffect(() => {
    if (state && state?.success) {
      toast.success("Specialty created successfully.");
      onSuccess();
      onClose();
    } else if (state && !state.success && state.error) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" placeholder="Cardiology" />
            {getInputFieldError("title", state) && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getInputFieldError("title", state)}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="file">Upload Icon</FieldLabel>

            <Input id="file" name="file" type="file" accept="image/*" />
            {getInputFieldError("file", state) && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getInputFieldError("file", state)}
              </span>
            )}
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Specialty"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialtiesFormDialog;
