'use server'
import { cookies } from "next/headers";
import { LoginObjectType } from "./login.types";
import { getUserCart } from "@/api/services/route.services";

// this function secures our api
export async function SignInAction(loginData : LoginObjectType){
    try {

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin" , {
        method:"post",
        body:JSON.stringify(loginData),
        headers:{
          'content-type' : 'application/json'
        }
      })

      const finalRes = await res.json()
      console.log(finalRes);
      // return res.ok
      if(res.ok){
        const cookie = await cookies()
        cookie.set('token' , finalRes.token , {
          httpOnly : true, // boolean => access this token via JS code or not => true : server requests only
          // secure: false,    // boolean => websites accessing this token must be 'https' or any   
          maxAge: 60 * 60 * 24, // time in seconds
          // expires: new Date() , //date
          sameSite: "lax" 
          //strict  =>  prevent sending this cookie while navigating from outside website to your website
          //lax     =>  accepts from another website to this website 
          //none    =>  fetch => send the cookie except in some cases like form submittion (token wont be sent) + i have to use secure:true
        })
        return true
      }
      return false
      
    } catch (error) {
      console.log("error" , error);
    }
  }


  export async function getCurrentAuthenticatedUserCart(){
    return await getUserCart()
  }