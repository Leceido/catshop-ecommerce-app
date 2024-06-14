import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import AnunciarProdutoComponent from "@/components/user/AnunciarProdutoComponent";
import { getServerSession } from "next-auth";

export default async function Anunciar() {
    const session = await getServerSession(nextAuthOptions)

    return (
        <AnunciarProdutoComponent session={session} />
    )
}