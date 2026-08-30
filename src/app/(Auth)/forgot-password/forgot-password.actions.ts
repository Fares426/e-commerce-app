'use server'

import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from '@/api/services/route.services';

export async function requestPasswordReset(email: string) {
  const res = await forgotPassword(email);
  if (res) {
    return { ok: true as const };
  }
  return { ok: false as const, message: 'We could not find an account with that email.' };
}

export async function confirmResetCode(resetCode: string) {
  const res = await verifyResetCode(resetCode);
  if (res) {
    return { ok: true as const };
  }
  return { ok: false as const, message: 'That code is invalid or has expired.' };
}

export async function submitNewPassword(email: string, newPassword: string) {
  const res = await resetPassword(email, newPassword);
  if (res) {
    return { ok: true as const };
  }
  return { ok: false as const, message: 'Could not reset your password. Try again.' };
}