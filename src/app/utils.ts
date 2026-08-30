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

// Returns both the external API token and the user id from a single decode,
// for callers (like getAllOrders) that need the id without decoding twice.
export async function decodeSession(): Promise<{ token: string; id: string } | null> {
    const cookieStore = await cookies()

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

    if (jwtRes?.token && jwtRes?.id) {
        return { token: jwtRes.token as string, id: jwtRes.id as string }
    }
    return null
}