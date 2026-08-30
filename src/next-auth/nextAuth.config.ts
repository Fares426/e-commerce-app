// Config => Next Auth => Which Provider

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from 'jwt-decode'
export const nextAuthConfig : NextAuthOptions = {
    providers: [
        Credentials({
            name:"Fresh Cart", // specify => login by Fresh Cart
            credentials:{
                email: {
                    label:"Email",
                    placeholder:"example@gmail.com",
                    type:"email"
                },
                password: {
                    label:"Password",
                    placeholder:"Enter your password",
                    type:"password"
                } 
            }, // fields you want to authenticate with
            authorize: async function(credentials){
            // the function that handles the login process or operation 

              const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin" , {
                method:"post",
                body:JSON.stringify(credentials),
                headers:{
                    'content-type' : 'application/json'
                 }
      })
              const finalRes = await res.json()
              console.log("finalRes from authorize" , finalRes);

              if(res.ok){
                const {name , email} = finalRes.user
                const data : {id:string} = jwtDecode(finalRes.token)
                return {
                    name ,
                    email ,
                    id : data.id , 
                    tokenCredentials:finalRes.token
                }
              }
              
            return null
            //Must return the authenticated user data or null => means the authentication operation failed
            }
        })
    ] ,
    jwt:{
        maxAge:60 * 60 * 24 * 2
    },
    pages:{
        signIn:'/login'
    },
    session:{
        maxAge:60 * 60 * 24 * 2
    },
    callbacks:{
        //callbacks are functions will be executed after another function ends
        //when? after successful sigin + user-refresh + getSession
        //recieves a paramater
        jwt:function({token , user}){            
            // param.token => the default token (object) that next-auth generated
            // param.user  => the authenticated user provided from authorize function
            if(user){
                const authUser = user as typeof user & { tokenCredentials?: string; id?: string };
                token.token = authUser.tokenCredentials ?? (token as any).token;
                token.id = authUser.id ?? (token as any).id;
            }
            return token
        },
        //when? useSession  -  getServerSession  -  api/auth/session
        session:function({session , token}){
            const user = session.user ?? {} as any;
            user.id = String((token as any).id ?? '');
            session.user = user;

            return session
        }
    }
}