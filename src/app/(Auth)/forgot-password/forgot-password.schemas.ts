import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export const resetCodeSchema = z.object({
  resetCode: z
    .string()
    .min(4, 'Enter the code sent to your email')
    .max(10, 'Enter the code sent to your email'),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rePassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ['rePassword'],
  });