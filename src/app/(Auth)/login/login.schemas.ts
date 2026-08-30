import * as zod from 'zod'

export const loginSchema = zod.object({
  email: zod.email("Email isn't in correct format").nonempty("Email is Required") ,
  password: zod.string().nonempty("Password is Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/ , "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.") ,
})