"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { getInputFieldError } from "@/utility/getInputFieldError";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginFormComponent = ({ redirect }: { redirect: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.error) {
      toast.error("Login failed. Please check your credentials.");
    }
  }, [state]);

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              // required
            />

            {getInputFieldError("email", state) && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getInputFieldError("email", state)}
              </span>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              // required
            />
            {getInputFieldError("password", state) && (
              <span className="text-red-600 font-medium text-xs -mt-2">
                {getInputFieldError("password", state)}
              </span>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginFormComponent;
