'use client'

import { signOut } from "next-auth/react"
import {useRouter} from 'next/navigation'

export default function HomeComponent() {
    const router = useRouter()
    async function logout() {
        await signOut({
            redirect: false
        });
        router.replace('/')
    }
    return (
        <div className="flex flex-col w-full h-[100vh] justify-center items-center space-y-2">
            <h1 className="text-3xl text-black">Sua sessão expirou, clique no botão para refazer login</h1>
            <button className="w-36 bg-indigo-600 rounded-full p-1 py-2 text-white cursor-pointer hover:bg-indigo-500" onClick={logout}>Refazer login</button>
        </div>
    )
}