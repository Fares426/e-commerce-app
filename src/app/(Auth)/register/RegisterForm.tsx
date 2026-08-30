'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MdPersonAddAlt1 } from "react-icons/md";
import { registerSchema } from "./register.schemas";
import { RegisterObjectType } from "./register.types";
import { SignUpAction } from "./register.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
  import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<RegisterObjectType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function submitRegisterForm(
    submittedFormData: RegisterObjectType
  ) {
    const isRegisteredSuccessfully = await SignUpAction(
      submittedFormData
    );

    if (isRegisteredSuccessfully) {
      toast.success("Account Registered Successfully", {
        duration: 2500,
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } else {
      toast.error("Account already exists", {
        duration: 2500,
        position: "top-center",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitRegisterForm)}
      className="space-y-5"
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="name"
              className="mb-2 text-sm font-medium"
            >
              Name*
            </FieldLabel>

            <Input
              {...field}
              id="name"
              placeholder="Ali"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-12 rounded-xl border-gray-200 px-4"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="email"
              className="mb-2 text-sm font-medium"
            >
              Email*
            </FieldLabel>

            <Input
              {...field}
              id="email"
              type="email"
              placeholder="ali@example.com"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-12 rounded-xl border-gray-200 px-4"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="password"
              className="mb-2 text-sm font-medium"
            >
              Password*
            </FieldLabel>

            <Input
              {...field}
              id="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-12 rounded-xl border-gray-200 px-4"
            />

            <p className="mt-2 text-xs text-gray-400">
              Must be at least 8 characters with numbers and symbols
            </p>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="rePassword"
              className="mb-2 text-sm font-medium"
            >
              Confirm Password*
            </FieldLabel>

            <Input
              {...field}
              id="rePassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-12 rounded-xl border-gray-200 px-4"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="phone"
              className="mb-2 text-sm font-medium"
            >
              Phone Number*
            </FieldLabel>

            <Input
              {...field}
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              className="h-12 rounded-xl border-gray-200 px-4"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox id="terms" />

        <label
          htmlFor="terms"
          className="text-sm leading-5 text-gray-500"
        >
          I agree to the{" "}
          <span className="font-medium text-green-600">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-medium text-green-600">
            Privacy Policy
          </span>
        </label>
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold hover:bg-green-700"
      >
        <MdPersonAddAlt1 className="mr-2 text-lg" />
        Create My Account
      </Button>

      {/* Login Link */}
      <p className="pt-2 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-green-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}