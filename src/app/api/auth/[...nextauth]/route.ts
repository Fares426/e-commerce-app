//Route Handlers
import NextAuth from "next-auth";
import {nextAuthConfig} from "@/next-auth/nextAuth.config"
// Next Auth => create route handler
const RouteHandler = NextAuth(nextAuthConfig)
export {RouteHandler as GET , RouteHandler as POST }  