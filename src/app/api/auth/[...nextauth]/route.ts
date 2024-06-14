import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: "email", },
                senha: { label: 'senha', type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    return await requestUser(credentials?.email, credentials?.senha)
                } catch (error) {
                    console.log(credentials?.email, credentials?.senha);
                    console.log("try catch do authorize ", error);
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}) {
            
            user && (token.user = user)
            
            return token
        },
        async session({session, token}) {
            
            session = token.user as any
            
            return session
        },
    },
    session: {
        maxAge: 2592000
    }
}
const handler = NextAuth(nextAuthOptions)

async function requestUser(cpf: any, password: any) {
    const response = await fetch('http://127.0.0.1:5000/api/usuario/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: cpf,
            senha: password,
        })
    })

    const user = await response.json()


    if (user && response.ok) {
        return user
    }
}

export { handler as GET, handler as POST, nextAuthOptions }