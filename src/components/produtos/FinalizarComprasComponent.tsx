'use client'

import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import ValorTotalComponent from "./ValorTotalComponent";

export default function FinalizarComprasComponent({ session }: any) {
    const { cartItems, setCartItems } = useContext(AppContext)
    const router = useRouter()
    

    

    const pedido = async (produto:any) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify({
                    id_produto: produto.id,
                    quantidade: produto.quantidade_selecionada
                })
            })

            if(response.status == 201) {
                console.log('Pedido criado');
            } else {
                console.log(await response.json());
            }
        } catch (error) {
            return (
                <h1>500 Internal server Error</h1> 
            )
        }
    }

    const criarPedido = async () => {
        await cartItems.map((produto:any) => {
            pedido(produto)
            localStorage.removeItem(produto.id)
        })
        setCartItems([])
        router.replace('/')
    }

    if (cartItems.length !== 0) {
        return (
            
            <div className="bg-primary-orange text-primary-l_green m-5 p-3 rounded-lg">
                <h1 className="text-3xl font-bold">Resumo Pedido</h1>
                <ValorTotalComponent />
                <div className="flex items-center justify-center p-2">
                    <button className="p-2 text-primary-orange bg-primary-l_green first-line:hover:text-primary-orange/90 hover:bg-primary-l_green/90 rounded-full font-bold" onClick={criarPedido}>
                        Finalizar Compra
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="text-center p-10 text-3xl">
                <h1>Carrinho vazio</h1>
                <Link className="bg-primary-orange text-primary-l_green hover:bg-primary-orange/90 hover:text-primary-l_green/90 rounded-full p-2 text-sm cursor-pointer" href='/'>Adicione itens ao carrinho</Link>
            </div>
        )
    }
}