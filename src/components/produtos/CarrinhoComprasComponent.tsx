'use client'

import { useContext } from "react"
import ProdutoCarrinhoComponent from "./ProdutoCarrinhoComponent"
import ValorTotalComponent from "./ValorTotalComponent"
import AppContext from "@/context/AppContext"
import Link from "next/link"

export default function CarrinhoComprasComponent({ data }: any) {
    const { cartItems, setCartItems } = useContext(AppContext)

    function excluirProduto(id:any) {
        const obj = cartItems.filter((item:any) => item.id !== id)
        setCartItems(obj)
        localStorage.removeItem(id)
    }



    return (
        <div className="w-full flex flex-row justify-between md:py-5 lg:px-20">
            <div className="flex flex-col grow justify-between m-4 overflow-y-scroll max-h-[800px]">
                {data.map((produto: any) => (
                    <div className="flex flex-row border-b-[1px] border-primary-orange" key={produto.id}>
                        <div className="grow">
                            <ProdutoCarrinhoComponent produto={produto} />
                        </div>
                        <div className="pr-4 flex items-center justify-center">
                            <div className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded-full p-1 cursor-pointer text-right " onClick={() => excluirProduto(produto.id)}>
                                <img src="/cart-xmark.svg" alt="carrinho remover" className="align-middle" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            

            <div className="flex flex-col justify-start items-center m-6">
                <div className="bg-primary-orange text-primary-l_green p-4">
                    <ValorTotalComponent />
                    
                    <Link href='/produtos/comprar'>
                        <div className="font-bold bg-primary-l_green text-primary-orange hover:bg-primary-l_green/90 hover:text-primary-orange/90 py-3 cursor-pointer rounded-full text-center">
                            Finalizar Pedido
                        </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}