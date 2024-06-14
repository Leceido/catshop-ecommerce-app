import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import FinalizarComprasComponent from "@/components/produtos/FinalizarComprasComponent";
import { getServerSession } from "next-auth";

export default async function FinalizarCompra() {
    const session = await getServerSession(nextAuthOptions)
    
    return (
        <div className="flex items-center justify-center">
            <div>
                <FinalizarComprasComponent session={session} />
            </div>
        </div>
    )
}