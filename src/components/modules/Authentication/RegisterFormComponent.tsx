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
import { useActionState } from "react";

const RegisterFormComponent = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  console.log(state, "state");

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            {/* {getFieldError("name") && (
              <FieldDescription className="text-red-600">
                {getFieldError("name")}
              </FieldDescription>
            )} */}
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

            {/* {getFieldError("address") && (
              <FieldDescription className="text-red-600">
                {getFieldError("address")}
              </FieldDescription>
            )} */}
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

            {/* {getFieldError("email") && (
              <FieldDescription className="text-red-600">
                {getFieldError("email")}
              </FieldDescription>
            )} */}
          </Field>
          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />

            {/* {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )} */}
          </Field>
          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            {/* {getFieldError("confirmPassword") && (
              <FieldDescription className="text-red-600">
                {getFieldError("confirmPassword")}
              </FieldDescription>
            )} */}
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
          </Field>
        </div>
        <FieldGroup className="mt-2">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
              submit
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
