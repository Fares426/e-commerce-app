import * as zod from 'zod'
import { loginSchema } from './login.schemas'

export type LoginObjectType = zod.infer<typeof loginSchema>