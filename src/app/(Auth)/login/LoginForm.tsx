'use client'

import React from 'react'
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "./login.schemas";
import { LoginObjectType } from "./login.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentAuthenticatedUserCart } from './login.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';
import { useCart } from '@/app/_providers/cartContextProvider';
import { CartContextType } from '@/api/services/types';
import Link from 'next/link';

export default function LoginForm() {
  const { updateNumberOfCartItems } = (useCart() as CartContextType);

  const router = useRouter();

  const { handleSubmit, control } = useForm<LoginObjectType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  });

  async function submitLoginForm(submittedLoginData: LoginObjectType) {

    const res = await signIn('credentials', {
      redirect: false,
      ...submittedLoginData
    });

    if (res?.ok) {
      const res = await getCurrentAuthenticatedUserCart();

      updateNumberOfCartItems(res?.products.length || 0);

      toast.success("Welcome Back", {
        duration: 2500,
        position: "top-center"
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);

    } else {

      toast.error("Email or Password is incorrect", {
        duration: 2500,
        position: "top-center"
      });

    }

    if (res?.ok) {
      router.refresh();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitLoginForm)}
      className="space-y-6"
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </FieldLabel>

            <Input
              {...field}
              id="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="off"
              type="email"
              className="h-12 rounded-xl border-gray-200 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-green-500"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </FieldLabel>

              <Link
                href="#"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Input
              {...field}
              id="password"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="off"
              type="password"
              className="h-12 rounded-xl border-gray-200 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-green-500"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold hover:bg-green-700"
      >
        Sign In
      </Button>
    </form>
  );
}