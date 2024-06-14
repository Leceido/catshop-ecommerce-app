import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import DadosUserComponent from "@/components/user/DadosUserComponent"
import SenhaUserComponent from "@/components/user/SenhaUserComponent"
import { getServerSession } from "next-auth"

export default async function Senha() {
    const session = await getServerSession(nextAuthOptions)

    
    return (
        <SenhaUserComponent session={session}/>
    )
}