'use client'

import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import ValorTotalComponent from "./ValorTotalComponent";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export default function FinalizarComprasComponent({ session }: any) {
    const { cartItems, setCartItems, preference_Id, setPreference_Id } = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        initMercadoPago(`${process.env.VENDEDOR1_MERCADOPAGO_PUBLIC_KEY}`, { locale: 'pt-BR' });
        console.log(cartItems);
    }, [])
    
    const pedido = async () => {
        try {
            const produtos:any = []
            cartItems.map((produto:any) => {
                const item = {
                    id_produto: produto.id,
                    quantidade: produto.quantidade_selecionada
                }
                produtos.push(item)
                localStorage.removeItem(`id:${produto.id}`)
            })
            

            const response = await fetch('http://127.0.0.1:5000/api/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify({
                    items: produtos
                })
            })

            const data = await response.json()

            if(response.status == 201) {
                console.log('Pedido criado');
                console.log(data.preference.id)
                setCartItems([])
                setPreference_Id(data.preference.id)
                router.replace(`/pedido/pagamento/${data.preference.id}`)
            } else {
                console.log(await response.json());
            }
        } catch (error) {
            return (
                <h1>500 Internal server Error</h1> 
            )
        }
    }

    if (cartItems.length !== 0) {
        return (
            
            <div className="bg-primary-orange text-primary-l_green m-5 p-3 rounded-lg">
                <h1 className="text-3xl font-bold">Resumo Pedido</h1>
                <ValorTotalComponent />
                <div className="flex items-center justify-center p-2">
                    <button className="p-2 text-primary-orange bg-primary-l_green first-line:hover:text-primary-orange/90 hover:bg-primary-l_green/90 rounded-full font-bold" onClick={pedido}>
                        Criar Pedido
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