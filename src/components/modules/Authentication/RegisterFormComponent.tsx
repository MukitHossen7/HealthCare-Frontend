/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerPatient } from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const RegisterFormComponent = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  const getFieldError = (fieldName: string) => {
    if (state && state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      if (error) {
        return error.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  useEffect(() => {
    if (state && !state.success) {
      toast.error(
        state.error || "Registration failed. Please check your details."
      );
    }
  }, [state]);

  // console.log(state);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            {getFieldError("name") && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getFieldError("name")}
              </span>
            )}
          </Field>
          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St"
            />

            {getFieldError("address") && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getFieldError("address")}
              </span>
            )}
          </Field>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />

            {getFieldError("email") && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getFieldError("email")}
              </span>
            )}
          </Field>
          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />

            {getFieldError("password") && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getFieldError("password")}
              </span>
            )}
          </Field>
          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            {getFieldError("confirmPassword") && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getFieldError("confirmPassword")}
              </span>
            )}
          </Field>
          {/* Gender */}
          <Field>
            <FieldLabel>Gender</FieldLabel>
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="male"
                  name="gender"
                  value="MALE"
                  className="w-4 h-4 accent-blue-600"
                />
                <Label htmlFor="male" className="text-sm font-medium">
                  Male
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="female"
                  name="gender"
                  value="FEMALE"
                  className="w-4 h-4 accent-blue-600"
                />
                <Label htmlFor="female" className="text-sm font-medium">
                  Female
                </Label>
              </div>
            </div>
            {getFieldError("gender") && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getFieldError("gender")}
              </span>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-2">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterFormComponent;
