import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import PedidosComponent from "@/components/pedidos/PedidosComponent"
import { getServerSession } from "next-auth"

export default async function pedidos() {
    const session = await getServerSession(nextAuthOptions)

    const response = await fetch('http://127.0.0.1:5000/api/pedido/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${session?.token}`
        },
    })

    const data = await response.json()
    const dataReverse = await data.pedidos.reverse()

    return (
        <div>
            <PedidosComponent data={dataReverse} items={5}/>
        </div>
    )
}