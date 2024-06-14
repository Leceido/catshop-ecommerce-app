'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CompraProdutoComponent({produto, session}:any) {
    const[quantidade, setQuantidade] = useState<number>(1)
    const router = useRouter()

    const pedido = async (e:any) => {
        e.preventDefault()
        try {
            const response = await fetch('http://127.0.0.1:5000/api/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify({
                    id_produto: produto.id,
                    quantidade: quantidade
                })
            })

            if(response.status == 201) {
                console.log('Pedido criado');
                router.replace('/')
            }
        } catch (error) {
            return (
                <h1>500 Internal server Error</h1> 
            )
        }
    }
    
    return (
        <div className="flex flex-col p-2 text-lg">
            <div>
                Detalhes Pedido: 
                <form action="">
                    <div>
                        <h1>Produto: {produto.nome}</h1>
                    </div>
                    <div>Quantidade Disponivel: {produto.quantidade}</div>
                    <div className="">
                        <label htmlFor="quantidade">Quantidade: </label>
                        <input 
                            className="w-20 bg-primary-orange text-primary-l_green rounded-lg p-1" 
                            type="number" 
                            name="quantidade" 
                            id="quantidade" 
                            min={1} 
                            max={produto.quantidade}
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                        />
                    </div>
                    <div>Preço Unitario: {produto.preco}</div>
                    <h1>Preço total: R$ {quantidade * produto.preco}</h1>
                    <div className="text-center">
                        <button onClick={pedido} className="bg-primary-orange text-primary-l_green rounded-full p-2">Confirmar Pedido</button>
                    </div>
                        
                </form>
            </div>
        </div>
    )
}