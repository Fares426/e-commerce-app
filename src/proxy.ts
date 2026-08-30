import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request : NextRequest){
    //runs between any request to any 'PAGE' and the response of the server to the client with the page requested 

    const token = await getToken({
        req:request,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!!token){
        return NextResponse.next()
    }
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}login`)
}

export const config = {
    matcher:['/profile']
} 