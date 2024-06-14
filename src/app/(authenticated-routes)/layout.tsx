import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";


interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOptions)
    
    if (!session) {
        redirect('/login')
    }

    return (
        <>
            <header>
                <Navbar data={session}/>
            </header>
            <div className="">
                {children}
            </div>
        </>
    )

}