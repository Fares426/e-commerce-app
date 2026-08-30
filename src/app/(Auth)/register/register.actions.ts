'use server'
import { RegisterObjectType } from "./register.types";

// this function secures our api
export async function SignUpAction(signupData : RegisterObjectType){
    try {

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup" , {
        method:"post",
        body:JSON.stringify(signupData),
        headers:{
          'content-type' : 'application/json'
        }
      })

      const finalRes = await res.json()
      console.log(finalRes);
      return res.ok
      
    } catch (error) {
      console.log("error" , error);
    }
  }