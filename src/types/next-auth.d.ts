import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        token: string
        user: {
            id: string
            email: string
            name: string
            user: string
        }
    }
}