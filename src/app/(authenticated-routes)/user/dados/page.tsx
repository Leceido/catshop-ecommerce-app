import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import DadosUserComponent from "@/components/user/DadosUserComponent"
import { getServerSession } from "next-auth"

export default async function Dados() {
    const session = await getServerSession(nextAuthOptions)

    
    return (
        <DadosUserComponent data={session?.user}/>
    )
}