import * as zod from 'zod'

export const registerSchema = zod.object({
  name: zod.string("Name must be Text").nonempty("Name is Required")
  .min(3,"Name must be atleast 3 characters").max(13,"Name maximum characters is 13") ,
  email: zod.email("Email isn't in correct format").nonempty("Email is Required") ,
  password: zod.string().nonempty("Password is Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/ , "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.") ,
  rePassword:zod.string().nonempty("Confirm Password is Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/ , "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.") ,
  phone: zod.string().nonempty("Phone Number is Required").regex(/^(?:\+20|20|0)?1[0125][0-9]{8}$/ , "Please enter a valid Egyptian mobile number.") ,
}).refine(function(values){
    return values.password === values.rePassword
} , {path:['rePassword'] , error:"Passwords Doesn't match"} );