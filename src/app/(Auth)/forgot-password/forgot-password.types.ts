import { z } from 'zod';
import { emailSchema, resetCodeSchema, newPasswordSchema } from './forgot-password.schemas';

export type EmailStepType = z.infer<typeof emailSchema>;
export type ResetCodeStepType = z.infer<typeof resetCodeSchema>;
export type NewPasswordStepType = z.infer<typeof newPasswordSchema>;