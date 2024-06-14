import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import EditarAnuncioComponent from "@/components/user/EditarAnuncioComponent"
import { getServerSession } from "next-auth"

interface IdProps {
    params: {
        id: string
    }
}

export default async function Anuncio({params}: IdProps) {
    const session = await getServerSession(nextAuthOptions)
    const response = await fetch(`http://127.0.0.1:5000/api/product/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
    })

    if (response.ok) {
        const data = await response.json()
        
        if (data.produto.anunciante !== session?.user.id) {
            return (
                <h1>Acesso negado</h1>
            )
        }
        return (
            <EditarAnuncioComponent data={data.produto} session={session}/>
        )
    } else if (response.status === 404) {
        return(
            <h1>Produto não encontrado</h1>
        )
    } else {
        return(
            <h1>Erro no servidor</h1>
        )
    }
}