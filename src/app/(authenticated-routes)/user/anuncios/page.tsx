import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import AnunciosComponent from "@/components/produtos/AnunciosComponent"
import { getServerSession } from "next-auth"

export default async function Anuncios() {
    const session = await getServerSession(nextAuthOptions)

    const response = await fetch('http://127.0.0.1:5000/api/product/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
    })

    const data = await response.json()
    const dataFilter = data.produtos.filter((produto:any) => produto.anunciante == session?.user.id)

    return (
        <div>
            <AnunciosComponent data={dataFilter} items={5}/>
        </div>
    )
}