import { registerSchema } from "./register.schemas";
import * as zod from 'zod'

export type RegisterObjectType = zod.infer<typeof registerSchema>
