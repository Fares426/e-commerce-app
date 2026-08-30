'use client'

import React, { useState } from 'react'
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { emailSchema, resetCodeSchema, newPasswordSchema } from './forgot-password.schemas';
import { EmailStepType, ResetCodeStepType, NewPasswordStepType } from './forgot-password.types';
import { requestPasswordReset, confirmResetCode, submitNewPassword } from './forgot-password.actions';

type Step = 'email' | 'code' | 'password';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailForm = useForm<EmailStepType>({
    defaultValues: { email: '' },
    resolver: zodResolver(emailSchema),
  });

  const codeForm = useForm<ResetCodeStepType>({
    defaultValues: { resetCode: '' },
    resolver: zodResolver(resetCodeSchema),
  });

  const passwordForm = useForm<NewPasswordStepType>({
    defaultValues: { password: '', rePassword: '' },
    resolver: zodResolver(newPasswordSchema),
  });

  async function handleEmailSubmit(data: EmailStepType) {
    setIsSubmitting(true);
    const res = await requestPasswordReset(data.email);
    setIsSubmitting(false);

    if (res.ok) {
      setEmail(data.email);
      toast.success('Reset code sent to your email', { position: 'top-center' });
      setStep('code');
    } else {
      toast.error(res.message, { position: 'top-center' });
    }
  }

  async function handleCodeSubmit(data: ResetCodeStepType) {
    setIsSubmitting(true);
    const res = await confirmResetCode(data.resetCode);
    setIsSubmitting(false);

    if (res.ok) {
      toast.success('Code verified', { position: 'top-center' });
      setStep('password');
    } else {
      toast.error(res.message, { position: 'top-center' });
    }
  }

  async function handlePasswordSubmit(data: NewPasswordStepType) {
    setIsSubmitting(true);
    const res = await submitNewPassword(email, data.password);
    setIsSubmitting(false);

    if (res.ok) {
      toast.success('Password reset successfully. Please sign in.', {
        duration: 2500,
        position: 'top-center',
      });
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } else {
      toast.error(res.message, { position: 'top-center' });
    }
  }

  if (step === 'email') {
    return (
      <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
        <p className="text-sm text-gray-500">
          Enter the email linked to your account and we&apos;ll send you a reset code.
        </p>

        <Controller
          name="email"
          control={emailForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold hover:bg-green-700"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Code'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Remembered your password?{' '}
          <Link href="/login" className="font-medium text-green-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    );
  }

  if (step === 'code') {
    return (
      <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-6">
        <p className="text-sm text-gray-500">
          Enter the code we sent to <span className="font-medium text-gray-900">{email}</span>.
        </p>

        <Controller
          name="resetCode"
          control={codeForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="resetCode" className="mb-2 text-sm font-medium text-gray-700">
                Reset Code
              </FieldLabel>
              <Input
                {...field}
                id="resetCode"
                aria-invalid={fieldState.invalid}
                placeholder="Enter the code"
                autoComplete="off"
                className="h-12 rounded-xl border-gray-200 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-green-500"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold hover:bg-green-700"
        >
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </Button>

        <button
          type="button"
          onClick={() => setStep('email')}
          className="w-full text-center text-sm text-gray-500 hover:text-green-600"
        >
          Use a different email
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
      <p className="text-sm text-gray-500">Choose a new password for your account.</p>

      <Controller
        name="password"
        control={passwordForm.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">
              New Password
            </FieldLabel>
            <Input
              {...field}
              id="password"
              aria-invalid={fieldState.invalid}
              placeholder="Enter new password"
              autoComplete="off"
              type="password"
              className="h-12 rounded-xl border-gray-200 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-green-500"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="rePassword"
        control={passwordForm.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="rePassword" className="mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </FieldLabel>
            <Input
              {...field}
              id="rePassword"
              aria-invalid={fieldState.invalid}
              placeholder="Confirm new password"
              autoComplete="off"
              type="password"
              className="h-12 rounded-xl border-gray-200 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-green-500"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold hover:bg-green-700"
      >
        {isSubmitting ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}