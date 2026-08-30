import 'server-only';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function decodeToken(): Promise<string | null> {
    const cookieStore = await cookies()

    // In production (HTTPS), NextAuth renames the cookie to __Secure-next-auth.session-token.
    // Locally (HTTP), it stays as next-auth.session-token. Check both.
    const nextAuthToken =
        cookieStore.get("__Secure-next-auth.session-token")?.value ??
        cookieStore.get("next-auth.session-token")?.value

    if (!nextAuthToken) {
        return null
    }

    const jwtRes = await decode({
        secret: process.env.NEXTAUTH_SECRET!,
        token: nextAuthToken
    })

    if (jwtRes) {
        return jwtRes.token as string
    }
    return null
}